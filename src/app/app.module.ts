
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
import { InfoPedidoComponent } from './pages/info-pedido/info-pedido.component';
import { PedidosComponent } from './pages/restaurants/pedidos/pedidos.component';
import { PedidoIdComponent } from './pages/restaurants/pedido-id/pedido-id.component';

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
import { ToastService } from './services/toastService.service';
import { StorageService} from './services/storage.service'
import { CarritoService } from './services/carrito.service';
import { GenerarStringService } from './services/generar-string.service';
import { FirestoreService } from './services/firestore.service';
import { LeerJsService } from './services/leer-js.service';

//Firebase - AngularFire
// import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HistorialPedidosComponent } from './pages/usuarios/historial-pedidos/historial-pedidos.component';
import { HistorialIdComponent } from './pages/usuarios/historial-id/historial-id.component';




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
    InfoPedidoComponent,
    PedidosComponent,
    PedidoIdComponent,
    HistorialPedidosComponent,
    HistorialIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AngularFireDatabaseModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig ),
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthServices, ToastService, AuthGuard, LoggedGuard, VerificationEmailGuard, VerificationGuard,
   StorageService, FirestoreService, LeerJsService, GenerarStringService, CarritoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
