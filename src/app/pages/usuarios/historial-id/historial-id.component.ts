import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pedido, ProductoPedido} from 'src/app/models/pedido.model';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthServices } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-historial-id',
  templateUrl: './historial-id.component.html',
  styleUrls: ['./historial-id.component.css']
})
export class HistorialIdComponent implements OnInit {

  idPedido: any;
  idUser: any;
  pedido: Pedido;
  rol: "cliente" | "restaurante";
  plazoletaSubscriber : Subscription;
  restauranteSubscriber : Subscription;
  userSubscriber : Subscription;
  getPedidoU: Subscription;
  constructor(private route: ActivatedRoute,
    private authService: AuthServices,
    private firestore: FirestoreService) {
    this.idPedido = route.snapshot.paramMap.get('id')
    this.authService.getUserLogged().subscribe(res=>{
      if(res){
        this.getDatosUser(res.uid)
        this.getRol(res.uid)
      }
    })
   }

  ngOnInit(): void {
  }

  getDatosUser(uid: any){
    const path = "Usuarios";
    const id = uid;
    this.userSubscriber = this.firestore.getDoc<Usuario>(path, id).subscribe(res=>{
      if(res){
       this.rol = res.role;
       this.getPedidoUser(uid);
      }
    });
  }
  restaurant : Restaurant;
  productos : ProductoPedido[];
  usuario: Usuario;
  getRol(uid: any){
    const path = "Plazoletas"
    this.plazoletaSubscriber = this.firestore.getCollection<Plazoleta>(path).subscribe( res =>{
      res.map(user => {
        const ruta = "Plazoletas/"+user.id+"/Restaurantes"
       this.restauranteSubscriber = this.firestore.getDoc<Restaurant>(ruta, uid).subscribe(data => {
          if(data){
            if(user.id == data.idPlazoleta){
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
    this.getPedidoU = this.firestore.getDoc<Pedido>(path, this.idPedido).subscribe(res=>{
      if(res){
        this.pedido = res;
        if(this.userSubscriber){
          this.userSubscriber.unsubscribe();
        }
        this.getPedidoU.unsubscribe();
      }
    })
  }

  getPedidosRestaurant(uid: any, data:any){
    const path = "Plazoletas/"+data+"/Restaurantes/"+uid+"/HistorialPedidos";
    this.firestore.getDoc<Pedido>(path, this.idPedido).subscribe(res=>{
      if(res){
        this.pedido = res;
        this.productos = res.productos;
        if(res.restaurante && res.usuario){
          this.restaurant = res.restaurante;
          this.usuario = res.usuario;
        }
        
        this.plazoletaSubscriber.unsubscribe();
        this.restauranteSubscriber.unsubscribe();
      }
    })
  }


  // getPedido(){
  //   const path = "Usuarios/"+this.idUser+"/HistorialPedidos/";
  //   this.firestore.getDoc<Pedido>(path, this.idPedido).subscribe(res=>{
  //     if(res){
  //       this.pedido = res;
  //     }
  //   })
  // }
}
