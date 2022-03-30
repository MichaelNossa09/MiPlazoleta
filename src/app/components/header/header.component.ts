import { Component,  OnInit } from '@angular/core';
import { AuthServices } from '../../services/auth.service';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { CargarjsService } from '../../services/cargarjs.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faBars = faBars;
  constructor(private authService: AuthServices, private cargarjs: CargarjsService) {
    cargarjs.carga(['header'])
   }

  public ngOnInit(): void {

  }
  isAutenticado(){
    return this.authService.isAutenticado();
  }
  salir(){
    this.authService.logout();
  }
  userLogged = this.authService.getUserLogged();
  isCollapsed=true;
}

