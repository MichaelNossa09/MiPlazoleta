import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServices } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationEmailGuard implements CanActivate {
  constructor(private authServe: AuthServices, private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authServe.userData$.pipe(
        map( user =>{
          if(user){
            if(user.emailVerified == true){
              return true;
            }
          }
          this.router.navigate(['/verification-email'])
          return false;
        })
      );
  }
  
}
