import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { StorageService } from 'src/app/services/storage.service';
import { AuthServices } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastService } from 'src/app/services/toastService.service';
import { GenerarStringService } from 'src/app/services/generar-string.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  archivo : any;

  datos: Plazoleta = {
    nombre:'',
    descripcion: '',
    ubicacion: '',
    image: ''
  }
  constructor(private router : Router, 
    private storage : StorageService,
    private firestore: FirestoreService,
    private toast: ToastService,
    private gString: GenerarStringService) {}
    
  ngOnInit(): void {}

  async guardarPlazoletasCreadas(){
    const path = "/Plazoletas";
    let reader = new FileReader;
    reader.readAsDataURL(this.archivo[0]);
    reader.onloadend = () => {
     this.storage.subirImagen("K"+Date.now(), reader.result, "plazoletas/").then(async url =>{
       this.datos.image = url;
       this.datos.id = this.gString.generaString();
       await this.firestore.createDoc(this.datos, path, this.datos.id) 
       this.router.navigate(["/home"])
       this.toast.toastService.success({
        detail: "Succes Message",
        summary: "Plazoleta agregada con éxito!",
        duration: 3000
       })
     }).catch(error =>{
      this.toast.toastService.error({
        detail: "Error Message",
        summary: "Error al agregar plazoleta",
        duration: 3000
      });
     })
    }
  }
  cargarImagen(event : any){
    this.archivo = event.target.files;
  }
}
  
