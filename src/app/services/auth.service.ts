import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';
import { Observable } from "rxjs";
import { ToastService } from "./toastService.service";



@Injectable()
export class AuthServices{
    public userData$: Observable<any>;
    constructor(private afauth: AngularFireAuth,
                private router : Router,
                private toastService: ToastService){
                    this.userData$ = this.afauth.authState;
                }

    token:string;
        
    register(email:string, password:string){
        return this.afauth.createUserWithEmailAndPassword(email,password)
    }
    login(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            res =>{
                firebase.auth().currentUser?.getIdToken().then(
                    token => {
                        this.token = token
                        if(res.user?.emailVerified == true){
                            this.router.navigate(['/plazoletas'])
                        }else{
                            this.router.navigate(['/verification-email']); 
                        }
                        this.toastService.toastService.success({
                            detail: "Succes Message",
                            summary: "Se ha logeado con exito.",
                            duration: 3000
                        });
                    }
                )
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
                firebase.auth().currentUser?.getIdToken().then(
                    token => {
                        this.token = token
                        this.router.navigate(['/plazoletas']);
                        this.toastService.toastService.success({
                            detail: "Succes Message",
                            summary: "Se ha logeado con exito.",
                            duration: 3000
                        });
                    }
                )
            }
        ).catch(error =>{
            this.toastService.toastService.error({
                detail: "Error Message",
                summary: "No se ha podido ingresar con Google.",
                duration: 3000
            })
        });
    }
    getIdToken(){
        return this.token;
    }
    getUserLogged(){
        return this.afauth.authState;
    }
    isAutenticado(){
        return this.token != null;
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