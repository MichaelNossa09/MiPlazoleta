import { Component, OnInit } from '@angular/core';
import { Plazoleta } from '../../models/plazoleta.model'
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthServices } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  login : boolean = false;
  rol: "cliente" | "restaurante";
  constructor(
    private firestore: FirestoreService,
    private authService: AuthServices,
    private router : Router,
    private carrito : CarritoService) {
      this.authService.getUserLogged().subscribe( res =>{
        if(res){
          this.login = true;
          this.getDatosUser(res.uid)
          this.getRol(res.uid)
          this.getPlazoletas()
          
        }else{
          this.login = false;
        }
      })
     }
  
  ngOnInit(): void {
  }
  getDatosUser(uid: any){
    const path = "Usuarios";
    const id = uid;
    this.firestore.getDoc<Usuario>(path, id).subscribe(res=>{
      if(res){
       this.rol = res.role
      }
      
    });
  }
  plazoletas : Plazoleta[];
  getPlazoletas(){
    const path = "Plazoletas"
    this.firestore.getCollection<Plazoleta>(path).subscribe(res=>{
      this.plazoletas = res;
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
            }
          }
        })
      })
    })
  }
  enviarId(id: any){
    this.router.navigate(['/plazoletas', id])
  }
}
