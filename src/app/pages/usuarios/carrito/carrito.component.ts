import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthServices } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { Pedido, ProductoPedido } from 'src/app/models/pedido.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { Platillos } from 'src/app/models/platillos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GenerarStringService } from 'src/app/services/generar-string.service';
import { ToastService } from 'src/app/services/toastService.service';
import { LeerJsService } from 'src/app/services/leer-js.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, OnDestroy {

  faPlus = faPlus;
  faMinus = faMinus;
  idUser: string;
  pedido: Pedido;
  usuario : Usuario;
  restaurant: Restaurant;
  productos: ProductoPedido[];
  carritoSubscriber : Subscription;
  userSubscriber : Subscription;


  constructor(private authService: AuthServices,
    private firestore: FirestoreService,
    private carrito: CarritoService,
    private router: Router,
    private gS :  GenerarStringService,
    private toast: ToastService,
    private leerJs: LeerJsService) {  
      this.authService.getUserLogged().subscribe( res => {
        if(res){
          this.idUser = res.uid;
          this.getPedidos();
        }
      })
   }
  ngOnInit(): void { }
   ngOnDestroy(): void {
    if(this.carritoSubscriber){
      this.carritoSubscriber.unsubscribe();
    }
    if(this.userSubscriber){
      this.userSubscriber.unsubscribe();
    }
  }
  getPedidos(){
    const path = "Usuarios/"+this.idUser+"/Carrito"
    this.carritoSubscriber = this.firestore.getDoc<Pedido>(path, this.idUser).subscribe( res => {
      if(res){
        this.pedido = res;
        this.productos = res.productos;
      }
    })
  }
  aumentarCantidad(platillo : Platillos){
    this.carrito.loadCarrito(this.pedido);
    this.carrito.aumentarProduct(platillo)
  }
  decrementarCantidad(platillo: Platillos){
    this.carrito.loadCarrito(this.pedido);
    this.carrito.quitarProduct(platillo)
  }
  async enviarPedido(){
    const pathUser = "Usuarios/"+this.idUser+"/Carrito"
    const path = "Plazoletas/"+this.pedido.restaurante?.idPlazoleta+"/Restaurantes/"+this.pedido.restaurante?.id+"/infoPedido";
    this.pedido.estado = "Pagado";
    await this.firestore.updateDoc(this.pedido, pathUser, this.idUser); 
    this.firestore.createDoc(this.pedido, path, this.idUser).then( () => {
      this.toast.toastService.success({
        detail: "Succes Message",
        summary: "Pedido realizado con éxito.",
        duration: 1000
      })
      
    })
  }
  async confirm(){
    const path = "Usuarios/"+this.idUser+"/HistorialPedidos"
    const pathRestaurant = "Plazoletas/"+this.pedido.restaurante?.idPlazoleta+"/Restaurantes/"+this.pedido.restaurante?.id+"/HistorialPedidos"
    const id = this.firestore.getId();
    this.pedido.id = id;
    await this.firestore.createDoc(this.pedido, pathRestaurant, id).then(()=>{
      const ruta =  "Plazoletas/"+this.pedido.restaurante?.idPlazoleta+"/Restaurantes/"+this.pedido.restaurante?.id+"/infoPedido"
      this.firestore.deleteDoc(ruta, this.idUser);
    });
    this.firestore.createDoc(this.pedido, path, id).then( () => {
      const ruta = "Usuarios/"+this.idUser+"/Carrito"
      this.firestore.deleteDoc(ruta, this.idUser).then(()=>{
        this.router.navigate(["/home"])
        this.toast.toastService.success({
          detail: "Succes Message",
          summary: "Disfruta de tu comida",
          duration: 2000
        })
      });
    })
  }
}
