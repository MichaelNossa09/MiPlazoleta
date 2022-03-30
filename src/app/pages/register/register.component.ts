import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toastService.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthServices } from '../../services/auth.service';
import { UsuariosService } from '../../services/usuariosService.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
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
  usuario={
    nombre: '',
    email: '',
    password: '',
    phone: '',
    role: 'user'
  };
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
  }
  guardarUsuarioCreado(): void{
    const {email, password} = this.usuario;
    this.authServices.register(email, password)
      .then((res) => {
        let usuario1 = new Usuario();
        usuario1 = {
          nombre: this.usuario.nombre,
          email: this.usuario.email,
          password: this.usuario.password,
          phone: this.usuario.phone,
          role: this.usuario.role
        } 
        this.usuariosService.create(usuario1).then( () =>{
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
}
