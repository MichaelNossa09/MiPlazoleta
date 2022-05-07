import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServices } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  admin : Boolean;
  constructor(private router : Router,
    private authService: AuthServices){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   return this.authService.userData$.pipe(
    map( user =>{
      if(user.uid  == "fwxnlf82IENbqdJiCbF0yBlW2eN2"){
        return true;
      }else{
        this.router.navigate(['/home'])
        return false;
      }
    })
  );
  }
}
