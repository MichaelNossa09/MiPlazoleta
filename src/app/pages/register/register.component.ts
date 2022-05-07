import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toastService.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthServices } from '../../services/auth.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LeerJsService } from 'src/app/services/leer-js.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
  images: any[]=[
    {name:'OnTheWok',
    img: 'https://firebasestorage.googleapis.com/v0/b/miplazoleta-69f98.appspot.com/o/restaurantes%2FK1649179034468?alt=media&token=f4fe0eb6-d9a1-4cf2-baa4-3eba25556f5a',
    des: 'Plazoleta con 5 años de servicio al publico, muy buena calidad.'},
    {name: 'Plazoleta La Samaria',
    img:'https://firebasestorage.googleapis.com/v0/b/miplazoleta-69f98.appspot.com/o/plazoletas%2FK1649100524169?alt=media&token=d14a4c72-79ba-4a15-bd69-23fed6d885df',
    des: 'La mejor para ir en familia'},
    {name: 'TwoDKB',
    img: 'https://firebasestorage.googleapis.com/v0/b/miplazoleta-69f98.appspot.com/o/restaurantes%2FK1649179129931?alt=media&token=69518bf6-93b4-47a2-b76c-88a1c9e78074',
    des: 'La mejor'}
  ];
  datos: Usuario = {
    uid: '',
    nombre: '',
    email: '',
    password: '',
    phone: '',
    role: 'cliente'
  }
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authServices: AuthServices,
    private _config: NgbCarouselConfig,
    private firestore: FirestoreService,
    private leerJs: LeerJsService
  ) {
    _config.interval = 4000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;
    _config.showNavigationIndicators = true;
    _config.animation = true;
    _config.wrap = true;
    this.leerJs.carga(['forms-validate'])
  }
  ngOnInit(): void {
  }
  async guardarUsuarioCreado(){
  
    this.authServices.register(this.datos).then( async res => {
      if(res.user){
        const path = 'Usuarios/';
        const id = res.user.uid;
        this.datos.uid = id;
        this.datos.password = '';
        this.router.navigate(['home']);
        await this.firestore.createDoc(this.datos, path, id)
        this.toastService.toastService.success({
          detail: "Succes Message",
          summary: "Se ha registrado con exito.",
          duration: 2500
        });
        // this.authServices.sendEmailForVerification();
      }
    }).catch( () => {
      this.toastService.toastService.error({
        detail: "Error Message",
        summary: "Correo existente o contraseña muy corta.",
        duration: 2500
    })
    })
  }
}
