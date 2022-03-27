import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthServices } from 'src/app/components/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  constructor(private authService : AuthServices,
          private _config : NgbCarouselConfig) {
       _config.interval = 4000;
       _config.pauseOnHover = true;
       _config.showNavigationArrows = false;
       _config.showNavigationIndicators = true;
       _config.animation = false;
       _config.wrap = true;
     }


  ngOnInit(): void {
  }
  
  login2(form: NgForm){
    const email  = form.value.email;
    const password = form.value.password;
    this.authService.login(email,password)
  }
  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

}
