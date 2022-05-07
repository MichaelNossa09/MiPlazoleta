import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { AuthServices } from 'src/app/services/auth.service';
import { ToastService} from 'src/app/services/toastService.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye} from '@fortawesome/free-solid-svg-icons';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { GenerarStringService } from 'src/app/services/generar-string.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  faEye = faEye;
  plazoletas : Plazoleta[];
  menu: Menu[];
  uid: any;
  rutaR: string;
  menuClick : Boolean = false;
  editClick : Boolean = false;
  length = 0;
  datos: Menu = {
    id: '',
    nombre : '',
    descripcion: '',
    idRestaurant: ''
  }
  constructor(
    private firestore: FirestoreService,
    private authService: AuthServices,
    private router : Router,
    private toast: ToastService,
    private gString: GenerarStringService) {
      this.authService.getUserLogged().subscribe( res =>{
        this.getRestaurant(res?.uid)
      })
     }

  ngOnInit(): void {
  }
  
  async agregarMenu(){
    
    const ruta = this.rutaR;
    this.datos.id = this.gString.generaString();
    await this.firestore.createDoc(this.datos, ruta , this.datos.id);
    this.toast.toastService.success({
      detail: "Succes Message",
      summary: "Se ha agregado con éxito",
      duration: 3000
    })
    this.router.navigate(['/home'])
  }
  getRestaurant(uid: any){
    const path = "Plazoletas"
    this.firestore.getCollection<Plazoleta>(path).subscribe( res =>{
      res.map(user => {
        const ruta = "Plazoletas/"+user.id+"/Restaurantes"
        this.firestore.getDoc<Restaurant>(ruta, uid).subscribe(data => {
          if(user.id == data?.idPlazoleta){
            this.rutaR = ruta+"/"+uid+"/Menus";
            this.datos.idRestaurant = data?.id;    
            this.firestore.getCollection<Menu>(this.rutaR).subscribe(sol => {
              this.menu = sol;
              this.length = sol.length;
            }) 
          }
        })
      })
    })
  }
  
  mostrarAdd(){
    this.menuClick = true;
    this.datos = {
      id: this.datos.id,
      nombre : '',
      descripcion: '',
      idRestaurant: this.datos.idRestaurant
    }
  }
  cerrarMenu(){
    this.menuClick = false;
  }
  verEditar(id: any){
    this.router.navigate(['/Menu', id])
  }
  async eliminar(id: any){
    const path = this.rutaR;
    await this.firestore.deleteDoc(path, id).then(() =>{
      this.toast.toastService.success({
        detail: "Succes Message",
        summary: "Se ha eliminado con éxito",
        duration: 3000
      })
    });
  }
  mostrarEdit(item: Menu){
    this.datos = item;
    this.datos.id = item.id;
    this.editClick = true;
  }
  cerrarEdit(){
    this.editClick = false;
  }
  async editarMenu(){
    const path = this.rutaR;
    await this.firestore.updateDoc(this.datos, path, this.datos.id);
    this.toast.toastService.success({
      detail: "Succes Message",
      summary: "Se ha modificado con éxito",
      duration: 3000
    })
    this.editClick = false;
  }
}

