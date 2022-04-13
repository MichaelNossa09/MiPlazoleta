import { Component, OnInit } from '@angular/core';

import { AuthServices } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { Pedido, ProductoPedido } from 'src/app/models/pedido.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { Platillos } from 'src/app/models/platillos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;
  idUser: string;
  pedido: Pedido;
  usuario : Usuario;
  restaurant: Restaurant;
  productos: ProductoPedido[];
  constructor(private authService: AuthServices,
    private firestore: FirestoreService,
    private carrito: CarritoService) {
    this.authService.getUserLogged().subscribe( res => {
      if(res){
        this.idUser = res.uid;
        this.getPedidos();
        this.carrito.loadCarrito();
      }
    })
   }
  ngOnInit(): void {
  }
  getUser(){
    const path = "Usuarios/"
    this.firestore.getDoc<Usuario>(path, this.idUser).subscribe( res => {
      if(res){
        this.usuario = res;
      }
    })
  }
  getPedidos(){
    const path = "Usuarios/"+this.idUser+"/Carrito"
    this.firestore.getDoc<Pedido>(path, this.idUser).subscribe( res => {
      if(res){
        this.pedido = res;
        this.productos = res.productos;
      }
    })
  }
  aumentarCantidad(platillo : Platillos){
    this.carrito.loadCarrito();
    this.carrito.aumentarProduct(platillo)
  }
  decrementarCantidad(platillo: Platillos){
    this.carrito.loadCarrito();
    this.carrito.quitarProduct(platillo)
  }
}
