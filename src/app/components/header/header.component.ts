import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private authService: AuthServices) { }

  ngOnInit(): void {
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

