import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';
import { Pedido } from 'src/app/models/pedido.model';
import { Platillos } from 'src/app/models/platillos.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthServices } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastService } from 'src/app/services/toastService.service';

@Component({
  selector: 'app-details-platillos',
  templateUrl: './details-platillos.component.html',
  styleUrls: ['./details-platillos.component.css']
})
export class DetailsPlatillosComponent implements OnInit, OnDestroy {

  idPlazoleta: any;
  idRestaurante: any;
  idMenu : string | null;
  platillos : Platillos[];
  uid: string;
  usuario: Usuario;
  restaurant: Restaurant;
  pedido: Pedido;
  menu: Menu[];
  platillosSubscriber : Subscription;
  restaurantSubscriber: Subscription;
  userSubscriber: Subscription;
  loadSubscriber: Subscription;
  menuSubscriber: Subscription;
  constructor(private route: ActivatedRoute,
    private firestore: FirestoreService,
    private carritoService: CarritoService,
    private authService: AuthServices,
    private toast: ToastService){
      this.idPlazoleta = this.route.snapshot.paramMap.get('id');
      this.idRestaurante = this.route.snapshot.paramMap.get('id2')
      this.idMenu = this.route.snapshot.paramMap.get('id3');     
      this.authService.getUserLogged().subscribe( res => {
        if(res){
          this.uid = res.uid;
          this.getPlatillos();
          this.getRestaurant();
          this.getUser();
          this.getMenus();
          this.loadCarrito();
        }
      })
     }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    if(this.platillosSubscriber){
      this.platillosSubscriber.unsubscribe();
    }
    if(this.restaurantSubscriber){
      this.restaurantSubscriber.unsubscribe();
    }
    if(this.userSubscriber){
      this.userSubscriber.unsubscribe();
    }
    if(this.loadSubscriber){
      this.loadSubscriber.unsubscribe();
    }
    if(this.menuSubscriber){
      this.menuSubscriber.unsubscribe();
    }
  }
  getRestaurant(){
    const path = "Plazoletas/"+this.idPlazoleta+"/Restaurantes/"
    this.restaurantSubscriber = this.firestore.getDoc<Restaurant>(path, this.idRestaurante).subscribe( res => {
      if(res){
        this.carritoService.getRestaurant(res);
        this.restaurant = res;
      }
    })
  }
  getUser(){
    const path = "Usuarios/"
    this.userSubscriber = this.firestore.getDoc<Usuario>(path,this.uid).subscribe( res => {
      if(res){
        this.carritoService.getUser(res)
      }
    })
  }
  loadCarrito(){
    const path = "Usuarios/"+this.uid+"/Carrito";
    this.loadSubscriber = this.firestore.getDoc<Pedido>(path, this.uid).subscribe( res =>{
        if(res){
          this.carritoService.loadCarrito(res); 
          this.pedido = res; 
          this.loadSubscriber.unsubscribe(); 
        }else{
          this.carritoService.initCarrito();
          this.pedido = {
            id: this.uid,
            usuario: this.usuario,
            restaurante: this.restaurant,
            productos: [],
            precioTotal: 0,
            estado: 'Enviado',
            fecha: new Date(),
            valoracion: null
            }
        }
    });
  }

  getPlatillos(){
    const path = "Plazoletas/"+this.idPlazoleta+"/Restaurantes/"+this.idRestaurante+"/Menus/"+this.idMenu+"/Platillos";  
    this.platillosSubscriber = this.firestore.getCollection<Platillos>(path).subscribe( res => {
      if(res){
        this.platillos = res;
      }
    })  
  }
  getMenus(){
    const path = "Plazoletas/"+this.idPlazoleta+"/Restaurantes/"+this.idRestaurante+"/Menus/";
    this.menuSubscriber = this.firestore.getCollection<Menu>(path).subscribe(res => {
      if(res){
        this.menu = res;
      }
    })
  }
 addCarrito(platillo: Platillos){
    if(this.restaurant.id == this.pedido.restaurante?.id){
      this.carritoService.addProducts(platillo);      
    }else{
      this.toast.toastService.error({
        detail: "Error Message",
        summary: "Ya hay un carrito existente con otro Restaurante, vacía el carrito.",
        duration: 3000
      })
    } 
  }
}
