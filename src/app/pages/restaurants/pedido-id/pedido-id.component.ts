import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstadoPedido, Pedido, ProductoPedido } from 'src/app/models/pedido.model';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthServices } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-pedido-id',
  templateUrl: './pedido-id.component.html',
  styleUrls: ['./pedido-id.component.css']
})
export class PedidoIdComponent implements OnInit, OnDestroy {


  idPedido : any;
  plazoletas: Plazoleta[];
  idRestaurant: any;
  restaurant: Restaurant
  idPlazoleta: any;
  pedido: Pedido;
  estado: EstadoPedido;
  productos: ProductoPedido[];
  usuario: Usuario;
  datosRestaurant: Subscription;
  datosUser: Subscription;
  datosPedido: Subscription;
  datosPlazoleta: Subscription;
  preparando: EstadoPedido = "En Proceso";
  terminado: EstadoPedido = "Terminado";
  entregado: EstadoPedido = "Entregado";
  constructor(route: ActivatedRoute,
    private firestore: FirestoreService,
    private authService: AuthServices) { 
      this.idPedido = route.snapshot.paramMap.get('id')
      this.authService.getUserLogged().subscribe( res => {
        if(res){
          this.idRestaurant = res.uid;
          this.getRestaurant();
        }
      })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if(this.datosRestaurant){
      this.datosRestaurant.unsubscribe();
    }
    if(this.datosUser){
      this.datosUser.unsubscribe();
    }
    if(this.datosPedido){
      this.datosPedido.unsubscribe();
    }
    if(this.datosPlazoleta){
      this.datosPlazoleta.unsubscribe();
    }
  }
  getRestaurant(){
    const path = "Plazoletas"
    this.datosPlazoleta = this.firestore.getCollection<Plazoleta>(path).subscribe( res =>{
      this.plazoletas = res;
      res.map(user => {
        const ruta = "Plazoletas/"+user.id+"/Restaurantes"
        this.datosRestaurant = this.firestore.getDoc<Restaurant>(ruta, this.idRestaurant).subscribe(data => {
          if(user.id == data?.idPlazoleta){
            if(data){
              this.restaurant = data;
              this.idPlazoleta = user.id;
              this.datosPlazoleta.unsubscribe();
              this.datosRestaurant.unsubscribe();
              this.getPedido();

            }
          }
          
        })
      })
    })
  }
  getPedido(){
    const path = "Plazoletas/"+this.idPlazoleta+"/Restaurantes/"+this.idRestaurant+"/infoPedido"
    this.datosPedido = this.firestore.getDoc<Pedido>(path, this.idPedido).subscribe( res => {
      if(res){
        this.pedido = res; 
        const path = "Usuarios"
        this.datosUser = this.firestore.getDoc<Usuario>(path, res.usuario.uid).subscribe( data => {
          if(data){
            this.usuario = data;
            this.datosPedido.unsubscribe();
            this.datosUser.unsubscribe();
          }
        }) 
      }
    })
  }
  async cambiarEstado(estado: EstadoPedido){
  
    this.pedido.estado = estado;
    const pathUser = "Usuarios/"+this.pedido.usuario.uid+"/Carrito";
    await this.firestore.updateDoc(this.pedido, pathUser, this.pedido.usuario.uid)
    const pathRestaurant = "Plazoletas/"+this.pedido.restaurante?.idPlazoleta+"/Restaurantes/"+this.idRestaurant+"/infoPedido"
    this.firestore.updateDoc(this.pedido, pathRestaurant, this.pedido.usuario.uid)
  }

}
