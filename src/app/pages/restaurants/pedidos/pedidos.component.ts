import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstadoPedido, Pedido, ProductoPedido } from 'src/app/models/pedido.model';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthServices } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GenerarStringService } from 'src/app/services/generar-string.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: Pedido[];
  pedido: Pedido;
  productos: ProductoPedido[];
  plazoletas: Plazoleta[];
  usuario : Usuario;
  idPlazoleta: any;
  restaurant: Restaurant;
  plazoleta: Plazoleta;
  idRestaurant: any
  carritoSubscriber : Subscription;
  userSubscriber : Subscription;
  length: any;
  pedidoAceptado: Boolean;
  constructor(private authService: AuthServices,
    private firestore: FirestoreService,
    private carrito: CarritoService,
    private gS: GenerarStringService,
    private router: Router) {
      this.authService.getUserLogged().subscribe( res => {
        if(res){
          this.idRestaurant = res.uid;
          this.getRestaurant();
        }
      })

   }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    if(this.carritoSubscriber){
      this.carritoSubscriber.unsubscribe();
    }
    if(this.userSubscriber){
      this.userSubscriber.unsubscribe();
    }
  }
  getRestaurant(){
    const path = "Plazoletas"
    this.firestore.getCollection<Plazoleta>(path).subscribe( res =>{
      this.plazoletas = res;
      res.map(user => {
        const ruta = "Plazoletas/"+user.id+"/Restaurantes"
        this.firestore.getDoc<Restaurant>(ruta, this.idRestaurant).subscribe(data => {
          if(user.id == data?.idPlazoleta){
            if(data){
              this.restaurant = data;
              this.idPlazoleta = user.id;
              this.getUser();
            }
          }
          
        })
      })
    })
  }
  getUser(){
    const path = "Plazoletas/"+this.idPlazoleta+"/Restaurantes/"+this.idRestaurant+"/infoPedido"
    this.firestore.getCollection<Pedido>(path).subscribe( res => {
      if(res){
        this.pedidos = res; 
        this.length = this.pedidos.length;  
        res.map(user => {
          const ruta = "Usuarios"
          this.firestore.getDoc<Usuario>(ruta, user.usuario.uid).subscribe(data => {
            if(data){
              if(user.usuario.uid == data?.uid){
                this.usuario = data;  
              }
            }
          })
        })
      }
    })
  }

  getPedidos(){
    const path = "Plazoletas/"+this.idPlazoleta+"/Restaurantes/"+this.idRestaurant+"/infoPedido"
    this.firestore.getCollection<Pedido>(path).subscribe( res => {
      if(res){
        this.pedidos = res;   
        this.length = this.pedidos.length; 
      }
    })
  }
  aceptarPedido(item: Pedido){   
    const path = "Plazoletas/"+this.idPlazoleta+"/Restaurantes/"+this.idRestaurant+"/infoPedido";
    this.firestore.updateDoc<Pedido>(item, path, item.usuario.uid);
    const pathUser = "Usuarios/"+item.usuario.uid+"/Carrito";
    this.firestore.updateDoc<Pedido>(item, pathUser, item.usuario.uid);
    this.router.navigate(["/pedidos", item.id])  
  }
}
