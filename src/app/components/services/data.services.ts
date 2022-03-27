import { Restaurant } from 'src/app/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../usuario.model';
import { AuthServices } from './auth.service';


@Injectable()
export class DataServices{

    userLogged = this.authService.getUserLogged();

    constructor(private httpClient: HttpClient,
            private authService: AuthServices){}

    cargarUsuarios(){
        return this.httpClient.get('https://miplazoleta-69f98-default-rtdb.firebaseio.com/usuarios.json');
    }
    cargarRestaurants(){
        return this.httpClient.get('https://miplazoleta-69f98-default-rtdb.firebaseio.com/restaurantes.json');
    }
    cargarPlazoletas(){
        return this.httpClient.get('https://miplazoleta-69f98-default-rtdb.firebaseio.com/plazoletas.json');
    }

    guardarUsuarios(usuario: Usuario[]){
        this.httpClient.put('https://miplazoleta-69f98-default-rtdb.firebaseio.com/usuarios.json', usuario)
        .subscribe(res=>{
            console.log("Usuario Agregado con éxito.")
        }, error => console.log("Error al agregar Usuario"));
    }
    guardarRestaurantes(restaurant : Restaurant[]){
        this.httpClient.put('https://miplazoleta-69f98-default-rtdb.firebaseio.com/restaurantes.json', restaurant).subscribe(res=>{
            console.log("Restaurante agregado con éxito.")
        }, error => console.log("Error al agregar restaurante")
        )
    }
}