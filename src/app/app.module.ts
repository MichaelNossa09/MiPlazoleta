import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup';

//js
import { CargarjsService} from './services/cargarjs.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthServices } from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { ToastService } from './services/toastService.service';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from './services/usuariosService.service';
import { DataServices } from './services/data.services';
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
import { DetailsPlazoletasComponent } from './pages/details-plazoletas/details-plazoletas.component';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';

import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { AdminComponent } from './pages/admin/admin.component';
import { PagesnotfoundComponent } from './pages/pagesnotfound/pagesnotfound.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    RegisterRestaurantComponent,
    AdminComponent,
    PagesnotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    FontAwesomeModule
  ],
  providers: [AuthServices, ToastService, UsuariosService, DataServices, AuthGuard, LoggedGuard, 
  VerificationEmailGuard, VerificationGuard, CargarjsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
