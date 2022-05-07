import { Restaurant } from 'src/app/models/restaurant.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthServices } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toastService.service';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LeerJsService } from 'src/app/services/leer-js.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.css']
})
export class RegisterRestaurantComponent implements OnInit {
  plazoletas : Plazoleta[];
  plazoleta : Plazoleta;
  archivo: any[];
  images: any[]=[
    {name:'HamburBeer',
    img: 'https://firebasestorage.googleapis.com/v0/b/miplazoleta-69f98.appspot.com/o/restaurantes%2FK1649179296026?alt=media&token=fafe58e3-da9b-431e-8282-942c02a11277',
    des: 'Plazoleta con 5 años de servicio al publico, muy buena calidad.'},
    {name: 'Margherita',
    img:'https://firebasestorage.googleapis.com/v0/b/miplazoleta-69f98.appspot.com/o/restaurantes%2FK1649179186942?alt=media&token=feb327d4-70ef-425d-918c-c5589376a4d9',
    des: 'La mejor para ir en familia'},
    {name: 'BurgerKing',
    img: 'https://firebasestorage.googleapis.com/v0/b/miplazoleta-69f98.appspot.com/o/restaurantes%2FK1649179344979?alt=media&token=affe2143-ea12-4f9b-ba1f-db5568199475',
    des: 'La mejor'}
  ];
  datos: Restaurant = {
    idPlazoleta: '',
    nombre: '',
    email: '',
    password: '',
    phone: '',
    descripcion: '',
    role: "restaurante",
    clientid: ''
  };

  constructor(
    private toastService: ToastService,
    private router: Router,
    private authServices: AuthServices,
    private _config: NgbCarouselConfig,
    private firestore: FirestoreService,
    private leerJs: LeerJsService,
    private storage: StorageService
  ) {
    _config.interval = 4000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;
    _config.showNavigationIndicators = true;
    _config.animation = true;
    _config.wrap = true;
    this.getPlazoletas();
    this.leerJs.carga(['forms-validate'])
  }
  ngOnInit(): void {
  }
  cargarImagen(event : any){
    this.archivo = event.target.files;  
  }
  guardarRestauranteCreado(){
    
    this.getPlazoletaForName();

    this.authServices.registerRestaurant(this.datos).then(res => {
      if(res.user){
        let reader = new FileReader;
        reader.readAsDataURL(this.archivo[0]);
        reader.onloadend = () => {
        this.storage.subirImagen("K"+Date.now(), reader.result, "restaurantes/").then( async url => {
            this.datos.image = url;
            this.datos.idPlazoleta = this.plazoleta.id;
            const path = "Plazoletas/"+this.datos.idPlazoleta+"/Restaurantes/";
            const id = res.user?.uid
            this.datos.id = id;
            this.datos.password = '*********';
            await this.firestore.createDoc(this.datos, path, id).then( () =>{
              this.toastService.toastService.success({
                detail: "Succes Message",
                summary: "Se ha registrado con exito.",
                duration: 3000
              });
              this.router.navigate(["/home"]);
            })
          })
        }
      }
    }).catch(()=>{
      this.toastService.toastService.error({
        detail: "Error Message",
        summary: "Correo existente o contraseña muy corta.",
        duration: 3000
    })
    })
  }
  getPlazoletaForName(){  
    const path = "Plazoletas/"
    this.firestore.getCollection<Plazoleta>(path).subscribe( res =>{
      res.map(user=>{
        if(user.nombre ==  this.datos.idPlazoleta){
          this.plazoleta = user;
        }
      })
    })
  }
  getPlazoletas(){
    const path = "Plazoletas"
    this.firestore.getCollection<Plazoleta>(path).subscribe(res=>{
      this.plazoletas = res;
    });
  }
}
