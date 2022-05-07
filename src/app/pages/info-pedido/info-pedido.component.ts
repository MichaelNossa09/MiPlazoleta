import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstadoPedido, Pedido, ProductoPedido } from 'src/app/models/pedido.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthServices } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GenerarStringService } from 'src/app/services/generar-string.service';

@Component({
  selector: 'app-info-pedido',
  templateUrl: './info-pedido.component.html',
  styleUrls: ['./info-pedido.component.css']
})
export class InfoPedidoComponent implements OnInit {

  idUser: string;
  pedido: Pedido;
  usuario : Usuario;
  precioTotal: number;
  estado: EstadoPedido;
  restaurant: Restaurant;
  productos: ProductoPedido[];
  carritoSubscriber : Subscription;
  userSubscriber : Subscription;

  constructor(private authService: AuthServices,
    private firestore: FirestoreService,
    private carrito: CarritoService,
    private gS: GenerarStringService,
    private router: Router) {
      this.authService.getUserLogged().subscribe( res => {
        if(res){
          this.idUser = res.uid;
          this.getPedidos();
        }
      })

   }
  ngOnInit(): void {}

  getPedidos(){
    
    const path = "Usuarios/"+this.idUser+"/Carrito"
    this.firestore.getDoc<Pedido>(path, this.idUser).subscribe( res => {
      if(res){
        this.pedido = res;
        this.usuario = res.usuario;
        if(res.restaurante){
          this.restaurant = res.restaurante;
        }
        this.productos = res.productos;
        this.precioTotal = res.precioTotal;
        this.estado = res.estado;
        this.loadCarrito(this.pedido);
      }
    })
  }
  loadCarrito(pedido: Pedido){
    if(pedido){
      this.pedido = pedido;
      console.log(this.pedido);
    }else{
      this.initPedido();

    }
  }
  confirm(){
    const path = "Usuarios/"+this.idUser+"/HistorialPedidos"
    const id = this.gS.generaString();
    this.firestore.createDoc(this.pedido, path, id).then( () => {
      const ruta = "Usuarios/"+this.idUser+"/Carrito"
      this.firestore.deleteDoc(ruta, this.idUser);
      this.router.navigate(["/home"])
    })
  }
  initPedido(){
    this.pedido = {
      id: '',
      usuario: this.usuario,
      restaurante: this.restaurant,
      productos: [],
      precioTotal: 0,
      estado: 'Pagado',
      fecha: new Date(),
      valoracion: null
      }
  }
}
