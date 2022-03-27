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
import { ProfileComponent } from './pages/profile/profile.component';
import { DetailsPlazoletasComponent } from './details-plazoletas/details-plazoletas.component';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';

const routes: Routes = [
  
  {pathMatch : 'full', path: '', redirectTo : 'home'},
  {path: "home", component : HomeComponent, canActivate:[AuthGuard, VerificationEmailGuard]},
  {path : "login", component: LoginComponent, canActivate:[LoggedGuard]},
  {path : "register", component: RegisterComponent, canActivate:[LoggedGuard]},
  {path : "register-restaurant", component: RegisterRestaurantComponent, canActivate:[LoggedGuard]},
  {path: "verification-email", component: SendComponent, canActivate:[AuthGuard, VerificationGuard]},
  {path: "profile", component: ProfileComponent, canActivate:[AuthGuard, VerificationEmailGuard]},
  {path: "plazoleta:/id", component: DetailsPlazoletasComponent, canActivate:[AuthGuard, VerificationEmailGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
