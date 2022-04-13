import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';
import { Observable } from "rxjs";
import { Restaurant } from "../models/restaurant.model";
import { Usuario } from "../models/usuario.model";
import { ToastService } from "./toastService.service";



@Injectable()
export class AuthServices{
    public userData$: Observable<any>;
    constructor(private afauth: AngularFireAuth,
                private router : Router,
                private toastService: ToastService){
                    this.userData$ = this.afauth.authState;
                }

    register(datos: Usuario){
        return this.afauth.createUserWithEmailAndPassword(datos.email, datos.password);
    }  
    registerRestaurant(datos: Restaurant){
        return this.afauth.createUserWithEmailAndPassword(datos.email, datos.password);
    }
    login(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            res =>{
                        if(res.user?.emailVerified == true){
                            this.router.navigate(['/home'])
                        }else{
                            this.router.navigate(['/verification-email']); 
                        }
                        this.toastService.toastService.success({
                            detail: "Succes Message",
                            summary: "Se ha logeado con exito.",
                            duration: 3000
                        });
                    }
                ).catch(error =>{
                    this.toastService.toastService.error({
                    detail: "Error Message",
                    summary: "Usuario y/o contraseña incorrecto.",
                    duration: 3000
                })
            });
    }
    loginWithGoogle(){
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
            res =>{
                        this.router.navigate(['/home']);
                        this.toastService.toastService.success({
                            detail: "Succes Message",
                            summary: "Se ha logeado con exito.",
                            duration: 3000
                        });
                    }
                ).catch(error =>{
                    this.toastService.toastService.error({
                        detail: "Error Message",
                        summary: "No se ha podido ingresar con Google.",
                        duration: 3000
                })
        });
    }

    getUserLogged(){
        return this.afauth.authState;
    }

    logout(){
        firebase.auth().signOut().then(() =>{
            this.router.navigate(['login'])
            this.toastService.toastService.success({
                detail: "Logout Message",
                summary: "Se ha cerrado sesión correctamente.",
                duration: 3000
            })
        }).catch(error => {
            this.toastService.toastService.error({
                detail: "Error Message",
                summary: "No se ha podido cerrar sesión",
                duration: 2000
            })
        });
    }
    async sendEmailForVerification():Promise<void>{
        return await (await this.afauth.currentUser)?.sendEmailVerification();
    }
}