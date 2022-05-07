import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pedido, ProductoPedido } from '../models/pedido.model';
import { Platillos } from '../models/platillos.model';
import { Restaurant } from '../models/restaurant.model';
import { Usuario } from '../models/usuario.model';
import { AuthServices } from './auth.service';
import { FirestoreService } from './firestore.service';
import { GenerarStringService } from './generar-string.service';
import { ToastService } from './toastService.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService{
  
  restaurantSubscriber: Subscription;
  pedido: Pedido;
  uid: any;
  usuario : Usuario;
  restaurant: Restaurant;

  constructor(private authService: AuthServices,
    private firestore: FirestoreService,
    private gS: GenerarStringService,
    private toast: ToastService,
    private router : Router){ 
    this.authService.getUserLogged().subscribe( res => {
         if(res){
          this.uid = res.uid;
        }
    }) 
  }
  loadCarrito(pedido: Pedido){
    if(pedido){
      this.pedido = pedido;
    }else{
      this.initCarrito();
    }
  }
  initCarrito(){
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
  getUser(usuario : Usuario){
    this.usuario = usuario;
  }
  getRestaurant(restaurant : Restaurant){
    this.restaurant = restaurant;
  }
   addProducts(platillo : Platillos){

    const item = this.pedido.productos.find( productoPedido => {
      return (productoPedido.platillo.id === platillo.id)
    });
    if(item !== undefined){
      item.cantidad ++;
      item.total = item.platillo.precio * item.cantidad;
      this.pedido.precioTotal = this.pedido.precioTotal + item.platillo.precio;
    }else{
      const add: ProductoPedido = {
        cantidad: 1,
        platillo,
        total : platillo.precio
      }
      this.pedido.precioTotal = this.pedido.precioTotal + add.total;
      this.pedido.productos.push(add);
    }
    const path = "Usuarios/"+this.uid+"/Carrito"
    this.firestore.createDoc(this.pedido, path, this.uid).then( () => {
      this.toast.toastService.success({
        detail: "Succes Message",
        summary: "Agregado al Carrito.",
        duration: 3000
      })
    })
    console.log(this.pedido.productos);
    
  }
  aumentarProduct(platillo: Platillos){
    const item = this.pedido.productos.find( productoPedido => {
      return (productoPedido.platillo.id === platillo.id)
    });
    if(item != undefined){
        item.cantidad ++;
        item.total = item.platillo.precio * item.cantidad;
        this.pedido.precioTotal = this.pedido.precioTotal + item.platillo.precio;
    }
    const path = "Usuarios/"+this.uid+"/Carrito"
    this.firestore.updateDoc(this.pedido, path, this.uid)
  }
  quitarProduct(platillo: Platillos){
    let position = 0;
    const item = this.pedido.productos.find( (productoPedido, index) => {
      position = index;
      return (productoPedido.platillo.id === platillo.id)
    });
    if(item != undefined){
      if(item.cantidad > 1){
        item.cantidad --;
        item.total = item.total - item.platillo.precio;
        this.pedido.precioTotal = this.pedido.precioTotal - item.platillo.precio;
      }else{
        this.pedido.precioTotal = this.pedido.precioTotal - item.platillo.precio;
        this.pedido.productos.splice(position, 1);

        if(this.pedido.productos.length == 0){
          console.log("Proceder a Eliminar DOC");
          const path = "Usuarios/"+this.uid+"/Carrito"
          this.firestore.deleteDoc<Pedido>(path, this.uid).then(() => {
            console.log("Eliminando Pedido...");
            this.toast.toastService.success({
              detail: "Succes Message",
              summary: "Carrito Eliminado.",
              duration: 3000
            })
            this.router.navigate(['/home'])
          });
        } 
      }
    }
    if(this.pedido.productos.length > 0){
      const path = "Usuarios/"+this.uid+"/Carrito"
      this.firestore.updateDoc(this.pedido, path, this.uid)
    }    
  }
}
