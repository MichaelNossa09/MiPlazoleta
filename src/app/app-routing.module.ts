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
import { DetailsPlazoletasComponent } from './pages/details-plazoletas/details-plazoletas.component';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';
import { PagesnotfoundComponent } from './pages/pagesnotfound/pagesnotfound.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  
  {pathMatch : 'full', path: '', redirectTo : 'plazoletas'},
  {path: "plazoletas", component : HomeComponent, canActivate:[AuthGuard, VerificationEmailGuard]},
  {path : "login", component: LoginComponent, canActivate:[LoggedGuard]},
  {path : "register", component: RegisterComponent, canActivate:[LoggedGuard]},
  {path : "register-restaurant", component: RegisterRestaurantComponent, canActivate:[AuthGuard, VerificationEmailGuard]},
  {path: "verification-email", component: SendComponent, canActivate:[AuthGuard, VerificationGuard]},
  {path: "profile", component: ProfileComponent, canActivate:[AuthGuard, VerificationEmailGuard]},
  {path: "plazoletas/:id", component: DetailsPlazoletasComponent, canActivate:[AuthGuard, VerificationEmailGuard]},
  {path: "admin", component: AdminComponent},
  {path: "**", component: PagesnotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
