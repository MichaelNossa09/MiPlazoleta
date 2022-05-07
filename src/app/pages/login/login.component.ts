import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthServices } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  constructor(private authService : AuthServices,
          private _config : NgbCarouselConfig) {
       _config.interval = 4000;
       _config.pauseOnHover = true;
       _config.showNavigationArrows = false;
       _config.showNavigationIndicators = true;
       _config.animation = true;
       _config.wrap = true;
     }


  ngOnInit(): void {
  }
  
  login(form: NgForm){
    const email  = form.value.email;
    const password = form.value.password;
    this.authService.login(email,password)
  }
  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

}
