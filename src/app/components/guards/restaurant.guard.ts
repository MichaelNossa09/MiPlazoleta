import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServices } from '../../services/auth.service';
import { map } from 'rxjs/operators'
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantGuard implements CanActivate {

  constructor(private authServe: AuthServices, private router : Router,
    private firestore : FirestoreService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }
}
