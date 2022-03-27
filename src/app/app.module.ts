import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthServices } from './components/services/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { ToastService } from './components/services/toastService.service';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from './components/services/usuariosService.service';
import { DataServices } from './components/services/data.services';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SendComponent } from './components/send/send.component';
import { AuthGuard } from './components/guards/auth.guard';
import { LoggedGuard } from './components/guards/logged.guard';
import { VerificationEmailGuard } from './components/guards/verification-email.guard';
import { VerificationGuard } from './components/guards/verification.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { DetailsPlazoletasComponent } from './details-plazoletas/details-plazoletas.component';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SendComponent,
    ProfileComponent,
    DetailsPlazoletasComponent,
    RegisterRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig )
  ],
  providers: [AuthServices, ToastService, UsuariosService, DataServices, AuthGuard, LoggedGuard, 
  VerificationEmailGuard, VerificationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
