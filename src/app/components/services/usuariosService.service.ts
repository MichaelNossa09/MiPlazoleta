import { Restaurant } from 'src/app/restaurant.model';

import { Injectable} from "@angular/core";
import { DataServices } from "./data.services";
import { Usuario } from "../../usuario.model";


@Injectable()
export class UsuariosService{

    usuarios: Usuario[] = [];
    restaurants: Restaurant[] = [];

    constructor(private dataServices : DataServices){}

    setUsuarios(usuarios : Usuario[]){
        this.usuarios = usuarios;   
    }  
    setRestaurants(restaurants: Restaurant[])  {
        this.restaurants = restaurants;
    }        

    
    agregarUsuario(usuario : Usuario){
        if(this.usuarios == null){
            this.usuarios = [];
        }
        this.usuarios.push(usuario);
        this.dataServices.guardarUsuarios(this.usuarios);
    }
    agregarRestaurante(restaurant : Restaurant){
        if(this.restaurants == null){
            this.restaurants = [];
        }
        this.restaurants.push(restaurant)
        this.dataServices.guardarRestaurantes(this.restaurants);
    }
    obtenerUsuarios(){
        return this.dataServices.cargarUsuarios();
    }
    obtenerRestaurants(){
        return this.dataServices.cargarRestaurants();
    }
}    