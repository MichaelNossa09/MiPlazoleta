import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pedido } from 'src/app/models/pedido.model';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthServices } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.css']
})
export class HistorialPedidosComponent implements OnInit, OnDestroy{

  pedidos: Pedido[];
  pedido: Pedido;
  length = 0;
  date : Date;
  rol: "cliente" | "restaurante";
  historialSubscriber : Subscription;
  userSubscriber : Subscription;
  constructor(private authService: AuthServices,
    private firestore: FirestoreService,
    private router : Router) {
    this.authService.getUserLogged().subscribe( res => {
      if(res){
        this.getDatosUser(res.uid)
        this.getRol(res.uid)
      }
    })
   }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    // if(this.historialSubscriber){
    //   this.historialSubscriber.unsubscribe();
    // }
    // if(this.userSubscriber){
    //   this.userSubscriber.unsubscribe();
    // }
  }

  getDatosUser(uid: any){
    const path = "Usuarios";
    const id = uid;
    this.firestore.getDoc<Usuario>(path, id).subscribe(res=>{
      if(res){
       this.rol = res.role;
       this.getPedidoUser(uid);
      }
    });
  }
  restaurant : any;
  getRol(uid: any){
    const path = "Plazoletas"
    this.firestore.getCollection<Plazoleta>(path).subscribe( res =>{
      res.map(user => {
        const ruta = "Plazoletas/"+user.id+"/Restaurantes"
        this.firestore.getDoc<Restaurant>(ruta, uid).subscribe(data => {
          if(data){
            if(user.id == data.idPlazoleta){
              this.restaurant = data;
              this.rol = data.role;   
              this.getPedidosRestaurant(uid, data.idPlazoleta);          
            }
          }
        })
      })
    })
  }

  getPedidoUser(uid: any){
    const path = "Usuarios/"+uid+"/HistorialPedidos/";
    this.firestore.getCollection<Pedido>(path).subscribe(res=>{
      if(res){
        this.pedidos = res;
        this.length = this.pedidos.length;
      }
    })
  }

  getPedidosRestaurant(uid: any, data:any){
    const path = "Plazoletas/"+data+"/Restaurantes/"+uid+"/HistorialPedidos";
    this.firestore.getCollection<Pedido>(path).subscribe(res=>{
      this.pedidos=res;
      this.length = this.pedidos.length;
    })
  }

  // getHistorial(id: any){
  //   const path = "Usuarios/"+id+"/HistorialPedidos/";
  //   this.firestore.getCollection<Pedido>(path).subscribe(res => {
  //     if(res){
  //       this.pedidos = res;
  //       this.length = this.pedidos.length;  
  //       res.map(user => {
  //         if(user){
  //           const ruta = "Plazoletas/"+user.restaurante?.idPlazoleta+"/Restaurantes/"
  //           this.firestore.getDoc<Restaurant>(ruta, user.restaurante?.id).subscribe(data=>{
  //             if(data){
  //               if(user.restaurante?.id == data?.id){
  //                 this.restaurante = data; 
  //               }
  //             }   
  //           })
  //         }
  //       })
  //     } 
  //   })
  // }
  verPedido(pedido: Pedido){
    this.router.navigate(["/historial", pedido.id])
  }

}
