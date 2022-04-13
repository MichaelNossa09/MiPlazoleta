import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendComponent } from './components/send/send.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './components/guards/auth.guard';
import { RegisterComponent} from './pages/register/register.component';
import { LoggedGuard } from './components/guards/logged.guard';
import { VerificationEmailGuard } from './components/guards/verification-email.guard';
import { VerificationGuard } from './components/guards/verification.guard';
import { ProfileComponent } from './pages/usuarios/profile/profile.component';
import { DetailsPlazoletasComponent } from './pages/usuarios/details-plazoletas/details-plazoletas.component';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';
import { PagesnotfoundComponent } from './pages/usuarios/pagesnotfound/pagesnotfound.component';
import { AdminComponent } from './pages/usuarios/admin/admin.component';
import { AdminGuard } from './components/guards/admin.guard';
import { MenuComponent } from './pages/restaurants/menu/menu.component';

import { VerPlatillosComponent } from './pages/restaurants/ver-platillos/ver-platillos.component';
import { DetailsMenuComponent } from './pages/usuarios/details-menu/details-menu.component';
import { DetailsPlatillosComponent } from './pages/usuarios/details-platillos/details-platillos.component';
import { CarritoComponent } from './pages/usuarios/carrito/carrito.component'

const routes: Routes = [
  
  {pathMatch : 'full', path: '', redirectTo : 'login'},
  {path:"home", component : HomeComponent, canActivate:[AuthGuard]},
  {path:"login", component: LoginComponent, canActivate:[LoggedGuard]},
  {path:"register", component: RegisterComponent, canActivate:[LoggedGuard]},
  {path:"register-restaurant", component: RegisterRestaurantComponent, canActivate:[LoggedGuard]},
  {path:"verification-email", component: SendComponent, canActivate:[AuthGuard]},
  {path:"profile", component: ProfileComponent, canActivate:[AuthGuard]},
  {path:"plazoletas/:id", component: DetailsPlazoletasComponent, canActivate:[AuthGuard]},
  {path:"plazoletas/:id/:id2", component: DetailsMenuComponent, canActivate:[AuthGuard] },
  {path:"plazoletas/:id/:id2/:id3", component: DetailsPlatillosComponent, canActivate:[AuthGuard] },
  {path:"admin", component: AdminComponent, canActivate:[AdminGuard]},
  {path: "Menu", component: MenuComponent, canActivate:[AuthGuard] },
  {path: "Menu/:id", component: VerPlatillosComponent, canActivate:[AuthGuard] },
  {path: "carrito", component: CarritoComponent, canActivate:[AuthGuard] },
  {path:"**", component: PagesnotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
