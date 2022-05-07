import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { Platillos } from 'src/app/models/platillos.model';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { AuthServices } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GenerarStringService } from 'src/app/services/generar-string.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toastService.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ver-platillos',
  templateUrl: './ver-platillos.component.html',
  styleUrls: ['./ver-platillos.component.css']
})
export class VerPlatillosComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  archivo: any[];
  idMenu: any;
  rutaR: any;
  nameMenu: any;
  platilloID: Platillos;
  btnEdit: Boolean = false;
  mostrar : Boolean = false;
  platilloVacio : Boolean = true;
  platillos: Platillos[];
  datos: Platillos = {
    id: '',
    idMenu: '',
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: ''
  }
  constructor(private _router: ActivatedRoute,
      private firestore : FirestoreService,
      private authService: AuthServices,
      private toast : ToastService,
      private router: Router,
      private storage: StorageService,
      private gString: GenerarStringService){
      this.idMenu = this._router.snapshot.paramMap.get('id')
      this.authService.getUserLogged().subscribe( res =>{
        this.getPlatillos(res?.uid)
        this.getRestaurant(res?.uid)
      })
   }

  ngOnInit(): void {
  }
  cargarImagen(event : any){
    this.archivo = event.target.files;
  }
  async agregarPlatillo(){
    let reader = new FileReader;
    reader.readAsDataURL(this.archivo[0]);
    reader.onloadend = () =>{
      this.storage.subirImagen("K"+Date.now(), reader.result, "platillos/").then(async url => {
        this.datos.imagen = url;
        const ruta = this.rutaR;
        this.datos.idMenu = this.idMenu;
        this.datos.id = this.gString.generaString();
        await this.firestore.createDoc(this.datos, ruta , this.datos.id);
        this.toast.toastService.success({
          detail: "Succes Message",
          summary: "Platillo agregado con éxito",
          duration: 3000
        })
        this.router.navigate(['/Menu'])
      })
    }
  }
  mostrarAdd(){
    this.mostrar = true;
    this.datos = {
      id: '',
      idMenu: this.idMenu,
      nombre: '',
      precio: 0,
      descripcion: '',
      imagen: ''
    }
  }
  cerrarAdd(){
    this.mostrar = false;
  }
  getRestaurant(uid: any){
    const path = "Plazoletas"
    this.firestore.getCollection<Plazoleta>(path).subscribe( res =>{
      res.map(user => {
        const ruta = "Plazoletas/"+user.id+"/Restaurantes"
        this.firestore.getDoc<Restaurant>(ruta, uid).subscribe(data => {
          if(user.id == data?.idPlazoleta){
            let route = ruta+"/"+uid+"/Menus"    
            this.firestore.getCollection<Menu>(route).subscribe(sol => {
              sol.map(name => {
                this.nameMenu = name.nombre;
              })
            }) 
          }
        })
      })
    })
  }


  getPlatillos(uid: any){
    const path = "Plazoletas"
    this.firestore.getCollection<Plazoleta>(path).subscribe( res =>{
      res.map(user => {
        const ruta = "Plazoletas/"+user.id+"/Restaurantes"
        this.firestore.getDoc<Restaurant>(ruta, uid).subscribe(data => {
          if(user.id == data?.idPlazoleta){
            this.rutaR = ruta+"/"+uid+"/Menus/"+this.idMenu+"/Platillos"    
            this.firestore.getCollection<Platillos>(this.rutaR).subscribe(sol => {
              this.platillos = sol;
              if(this.platillos.length > 0){
                this.platilloVacio = false;       
              }
            }) 
          }
        })
      })
    })
  }

  abrirEdit(platillo: Platillos){ 
      this.datos = platillo;
      this.datos.id = platillo.id;
      this.btnEdit = true;
  }
  cerrarEdit(){
    this.btnEdit = false;
  }
  async editPlatillo(){
    let reader = new FileReader;
    reader.readAsDataURL(this.archivo[0]);
    reader.onloadend = () =>{
      this.storage.subirImagen("K"+Date.now(), reader.result, "platillos/").then(async url => {
        this.datos.imagen = url;
        const ruta = this.rutaR;
        this.datos.idMenu = this.idMenu;
        await this.firestore.updateDoc(this.datos, ruta , this.datos.id);
        this.toast.toastService.success({
          detail: "Succes Message",
          summary: "Se ha modificado con éxito",
          duration: 3000
        })
        this.btnEdit = false;
      })
    }
  }
  async elim(id: any){
    const path = this.rutaR;
    await this.firestore.deleteDoc(path, id).then(() =>{
      this.toast.toastService.success({
        detail: "Succes Message",
        summary: "Se ha eliminado con éxito",
        duration: 3000
      })
    });
  }

}

