import { Restaurant } from 'src/app/models/restaurant.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthServices } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toastService.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { ServicePlazoletaService } from 'src/app/services/service-plazoleta.service';
import { map } from 'rxjs/operators';
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
  images: any[]=[
    {name:'Plazoleta La 19',
    img: 'plazoleta1.jpg',
    des: 'Plazoleta con 5 años de servicio al publico, muy buena calidad.'},
    {name: 'Plazoleta Ocean Mall',
    img:'plazoleta2.jpg',
    des: 'La mejor para ir en familia'},
    {name: 'Plazoleta Kikiro',
    img: 'plazoleta3.jpg',
    des: 'La mejor'}
  ];
  datos: Restaurant = {
    idPlazoleta: '',
    nombre: '',
    email: '',
    password: '',
    phone: '',
    descripcion: '',
    image: '',
    role: "restaurante"
  };

  constructor(
    private toastService: ToastService,
    private router: Router,
    private authServices: AuthServices,
    private restaurantService: RestaurantService,
    private plazoletaService: ServicePlazoletaService,
    private _config: NgbCarouselConfig,
    private firestore: FirestoreService,
    private leerJs: LeerJsService,
    private storage: StorageService
  ) {
    _config.interval = 4000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;
    _config.showNavigationIndicators = true;
    _config.animation = false;
    _config.wrap = true;
    this.getPlazoletas();
    leerJs.carga(['forms-validate'])
  }
  ngOnInit(): void {
    //this.recibirDatosBD();
  }
  archivo: any[];
  cargarImagen(event : any){
    this.archivo = event.target.files;
  }
   async guardarRestauranteCreado(){
    
    this.getPlazoletaForName();
    const res = await this.authServices.registerRestaurant(this.datos).catch( error =>{
      this.toastService.toastService.error({
          detail: "Error Message",
          summary: "Correo existente o contraseña muy corta.",
          duration: 3000
      })
    })
    if(res){
      let reader = new FileReader;
      reader.readAsDataURL(this.archivo[0]);
      reader.onloadend = () => {
      this.storage.subirImagen("K"+Date.now(), reader.result, "restaurantes/").then(async url => {
        this.datos.image = url;
        this.datos.idPlazoleta = this.plazoleta.id;
        const path = 'Plazoletas/'+this.datos.idPlazoleta+'/Restaurantes';
        const id = res.user?.uid;
        this.datos.id = id;
        this.datos.password = '';
        this.router.navigate(['verification-email']);
        await this.firestore.createDoc(this.datos, path, id)
        this.toastService.toastService.success({
          detail: "Succes Message",
          summary: "Se ha registrado con exito.",
          duration: 3000
        });
        this.authServices.sendEmailForVerification();
        })
      }
    }
  }
  getPlazoletaForName(){  
    const path = "Plazoletas"
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
  elegirPlazoleta(id: any){
    console.log(id);
  }
  // guardarRestauranteCreado(): void{
  //   const {email, password} = this.restaurant;
  //   this.authServices.register(email, password)
  //     .then((res) => {
  //       let restaurant1 = new Restaurant();
  //       restaurant1 = {
  //         idPlazoleta:  this.idPlazoleta,
  //         nombre: this.restaurant.nombre,
  //         email: this.restaurant.email,
  //         password: this.restaurant.password,
  //         phone: this.restaurant.phone,
  //         descripcion: this.restaurant.descripcion,
  //         image: this.restaurant.image,
  //         role: this.restaurant.role
  //       } 
  //       this.restaurantService.create(restaurant1).then( () =>{
  //         this.router.navigate(['verification-email']);
  //         this.authServices.sendEmailForVerification();
  //         this.toastService.toastService.success({
  //           detail: "Succes Message",
  //           summary: "Se ha registrado con exito.",
  //           duration: 3000
  //         });
  //       });
  //     }).catch((error) => {
  //         this.router.navigate(['login'])
  //         this.toastService.toastService.error({
  //           detail: "Error Message",
  //           summary: "Correo existente o contraseña muy corta.",
  //           duration: 3000
  //         })
  //     });
  // }
  // refrescarPlazoletas(): void{
  //   this.plazoleta = undefined;
  //   this.plazoletaIndex = -1;
  //   this.recibirDatosBD();
  // }
  // recibirDatosBD(): void{
  //   this.plazoletaService.getAll().snapshotChanges().pipe(
  //     map(cambiar => cambiar.map(c => ({
  //       id: c.payload.key, ...c.payload.val()
  //     })))
  //   ).subscribe(data =>{
  //     this.plazoletas = data;
  //   })
  // }
  // registrarse() {
  //   const {email, password} = this.restaurant;
  //   this.authServices
  //     .register(email, password)
  //     .then((res) => {
  //       let restaurant1 = new Restaurant();
  //       restaurant1 = {
  //         id : this.restaurant.id,
  //         nombre: this.restaurant.nombre,
  //         email: this.restaurant.email,
  //         password: this.restaurant.password,
  //         phone: this.restaurant.phone,
  //         descripcion: this.restaurant.descripcion,
  //         image: this.restaurant.image,
  //         role: this.restaurant.role
  //       }
  //       this.usuariosService.agregarRestaurante(restaurant1);
  //       this.router.navigate(['verification-email']);
  //       this.authServices.sendEmailForVerification();
  //       this.toastService.toastService.success({
  //         detail: "Succes Message",
  //         summary: "Se ha registrado con exito.",
  //         duration: 3000
  //     });
  //     })
  //     .catch((error) => {
  //       this.router.navigate(['login'])
  //       this.toastService.toastService.error({
  //         detail: "Error Message",
  //         summary: "Correo existente o contraseña muy corta.",
  //         duration: 3000
  //     })
  //     });
  // }

}
