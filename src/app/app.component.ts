import { Component } from '@angular/core';
import { Usuario } from './models/usuario.model';
import { UsuariosService } from './services/usuariosService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usuarios : Usuario[] = [];
  constructor(private usuariosService: UsuariosService){}
  ngOnInit(): void {
    // this.usuariosService.obtenerUsuarios().subscribe(
    //   (usuarios : any) =>{
    //     this.usuarios = usuarios;
    //     this.usuariosService.setUsuarios(usuarios);
    //   } 
    // );
  }
}
