import { Restaurant } from 'src/app/restaurant.model';
import { Usuario } from './../../usuario.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthServices } from 'src/app/components/services/auth.service';
import { ToastService } from 'src/app/components/services/toastService.service';
import { UsuariosService } from 'src/app/components/services/usuariosService.service';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.css']
})
export class RegisterRestaurantComponent implements OnInit {

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
  restaurant: Restaurant[];
  name: string;
  email: string;
  password: string;
  phone: string;
  descripcion:string;
  image:string = "rutaImage";
  role: string = "restaurant"
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authServices: AuthServices,
    private usuariosService: UsuariosService,
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
    this.usuariosService.obtenerRestaurants();
  }
  registrarse() {
    this.authServices
      .register(this.email, this.password)
      .then((res) => {
        let restaurant1 = new Restaurant(
          this.name,
          this.email,
          this.password,
          this.phone,
          this.descripcion,
          this.image,
          this.role
        );
        this.usuariosService.agregarRestaurante(restaurant1);
        this.router.navigate(['verification-email']);
        this.authServices.sendEmailForVerification();
        this.toastService.toastService.success({
          detail: "Succes Message",
          summary: "Se ha registrado con exito.",
          duration: 3000
      });
      })
      .catch((error) => {
        this.router.navigate(['login'])
        this.toastService.toastService.error({
          detail: "Error Message",
          summary: "Correo existente o contraseña muy corta.",
          duration: 3000
      })
      });
  }

}
