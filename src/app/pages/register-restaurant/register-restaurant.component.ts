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

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.css']
})
export class RegisterRestaurantComponent implements OnInit {
  
  plazoletas?: Plazoleta[];
  plazoleta?: Plazoleta;
  plazoletaIndex = -1;
  idPlazoleta : any;
  
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
  restaurant = {
    nombre: '',
    email: '',
    password: '',
    phone: '',
    descripcion: '',
    image: 'RUTAIMAGE',
    role: 'restaurant'
  };

  constructor(
    private toastService: ToastService,
    private router: Router,
    private authServices: AuthServices,
    private restaurantService: RestaurantService,
    private plazoletaService: ServicePlazoletaService,
    private _config: NgbCarouselConfig
  ) {
    _config.interval = 4000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;
    _config.showNavigationIndicators = true;
    _config.animation = false;
    _config.wrap = true;
  }
  ngOnInit(): void {
    this.recibirDatosBD();
  }
  guardarRestauranteCreado(): void{
    const {email, password} = this.restaurant;
    this.authServices.register(email, password)
      .then((res) => {
        let restaurant1 = new Restaurant();
        restaurant1 = {
          idPlazoleta:  this.idPlazoleta,
          nombre: this.restaurant.nombre,
          email: this.restaurant.email,
          password: this.restaurant.password,
          phone: this.restaurant.phone,
          descripcion: this.restaurant.descripcion,
          image: this.restaurant.image,
          role: this.restaurant.role
        } 
        this.restaurantService.create(restaurant1).then( () =>{
          this.router.navigate(['verification-email']);
          this.authServices.sendEmailForVerification();
          this.toastService.toastService.success({
            detail: "Succes Message",
            summary: "Se ha registrado con exito.",
            duration: 3000
          });
        });
      }).catch((error) => {
          this.router.navigate(['login'])
          this.toastService.toastService.error({
            detail: "Error Message",
            summary: "Correo existente o contraseña muy corta.",
            duration: 3000
          })
      });
  }
  refrescarPlazoletas(): void{
    this.plazoleta = undefined;
    this.plazoletaIndex = -1;
    this.recibirDatosBD();
  }
  recibirDatosBD(): void{
    this.plazoletaService.getAll().snapshotChanges().pipe(
      map(cambiar => cambiar.map(c => ({
        id: c.payload.key, ...c.payload.val()
      })))
    ).subscribe(data =>{
      this.plazoletas = data;
    })
  }
  elegirPlazoleta(id: any): void{
    this.idPlazoleta = id;
   }
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
