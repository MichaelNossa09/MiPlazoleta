import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from '@firebase/util';
import { resolve } from 'dns';
import { Observable, pipe } from 'rxjs';
import { Pedido } from 'src/app/models/pedido.model';
import { Platillos } from 'src/app/models/platillos.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthServices } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GenerarStringService } from 'src/app/services/generar-string.service';
import { ToastService } from 'src/app/services/toastService.service';

@Component({
  selector: 'app-details-platillos',
  templateUrl: './details-platillos.component.html',
  styleUrls: ['./details-platillos.component.css']
})
export class DetailsPlatillosComponent implements OnInit {

  idPlazoleta: any;
  idRestaurante: any;
  idMenu : string | null;
  platillos : Platillos[];
  uid: string;
  usuario: Usuario;
  restaurant: Restaurant;
  pedido: Pedido;
  constructor(private route: ActivatedRoute,
    private firestore: FirestoreService,
    private carritoService: CarritoService,
    private authService: AuthServices){
      this.idPlazoleta = this.route.snapshot.paramMap.get('id');
      this.idRestaurante = this.route.snapshot.paramMap.get('id2')
      this.idMenu = this.route.snapshot.paramMap.get('id3');     
      this.authService.getUserLogged().subscribe( res => {
        if(res){
          this.uid = res.uid;
          this.getPlatillos();
          this.carritoService.getRestaurant(this.idPlazoleta, this.idRestaurante)
        }
      })
     }

  ngOnInit(): void {}

  getPlatillos(){
    const path = "Plazoletas/"+this.idPlazoleta+"/Restaurantes/"+this.idRestaurante+"/Menus/"+this.idMenu+"/Platillos";  
    this.firestore.getCollection<Platillos>(path).subscribe( res => {
      if(res){
        this.platillos = res;
      }
    })  
  }
 addCarrito(platillo: Platillos){
    this.carritoService.addProducts(platillo)
  }

}
