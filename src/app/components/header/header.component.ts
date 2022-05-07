import { Component,  OnInit } from '@angular/core';
import { AuthServices } from '../../services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Plazoleta } from 'src/app/models/plazoleta.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  plazoletas : Plazoleta[];
  dataRestaurant: any;

  login = false;
  admin = false;
  usuario = false;
  rol: "cliente" | "restaurante";
  constructor(private authService: AuthServices,
  private firestore: FirestoreService) {
      this.authService.getUserLogged().subscribe( res =>{
        if(res){
          this.login = true;
          if(res.uid == "fwxnlf82IENbqdJiCbF0yBlW2eN2"){
            this.admin = true;
          }
          this.getRol(res.uid);
          this.getDatosUser(res.uid)
        }else{
          this.login = false;
        }
      })
   }

  public ngOnInit(): void {}
  salir(){
    this.authService.logout();
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
  getRol(uid: any){
    const path = "Plazoletas"
    this.firestore.getCollection<Plazoleta>(path).subscribe( res =>{
      res.map(user => {
        const ruta = "Plazoletas/"+user.id+"/Restaurantes"
        this.firestore.getDoc<Restaurant>(ruta, uid).subscribe(data => {
          if(data){
            if(user.id == data.idPlazoleta){
              this.rol = data.role;       
            }
          }
        })
      })
    })
  }

}

