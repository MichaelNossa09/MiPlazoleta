
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/usuarios/profile/profile.component';
import { DetailsPlazoletasComponent } from './pages/usuarios/details-plazoletas/details-plazoletas.component';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';
import { PagesnotfoundComponent } from './pages/usuarios/pagesnotfound/pagesnotfound.component';
import { AdminComponent } from './pages/usuarios/admin/admin.component';
import { SendComponent } from './components/send/send.component';;
import { MenuComponent } from './pages/restaurants/menu/menu.component';
import { VerPlatillosComponent } from './pages/restaurants/ver-platillos/ver-platillos.component';
import { DetailsMenuComponent } from './pages/usuarios/details-menu/details-menu.component';
import { DetailsPlatillosComponent } from './pages/usuarios/details-platillos/details-platillos.component';
import { CarritoComponent } from './pages/usuarios/carrito/carrito.component';
import { ItemCarritoComponent } from './components/item-carrito/item-carrito.component';

//Moduls
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Services and Guards
import { AuthGuard } from './components/guards/auth.guard';
import { AuthServices } from './services/auth.service';
import { LoggedGuard } from './components/guards/logged.guard';
import { VerificationGuard } from './components/guards/verification.guard';
import { VerificationEmailGuard } from './components/guards/verification-email.guard';
import { UsuariosService } from './services/usuariosService.service';
import { ToastService } from './services/toastService.service';
import { StorageService} from './services/storage.service'
import { ServicePlazoletaService } from './services/service-plazoleta.service';
import { RestaurantService } from './services/restaurant.service';
import { CarritoService } from './services/carrito.service';
import { GenerarStringService } from './services/generar-string.service';
import { FirestoreService } from './services/firestore.service';
import { LeerJsService } from './services/leer-js.service';

//Firebase - AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';



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
    PagesnotfoundComponent,
    MenuComponent,
    VerPlatillosComponent,
    DetailsMenuComponent,
    DetailsPlatillosComponent,
    CarritoComponent,
    ItemCarritoComponent
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
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthServices, ToastService, UsuariosService, AuthGuard, LoggedGuard, 
  VerificationEmailGuard, VerificationGuard, StorageService, ServicePlazoletaService, RestaurantService,
  FirestoreService, LeerJsService, GenerarStringService, CarritoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
