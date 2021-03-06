import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-menu',
  templateUrl: './details-menu.component.html',
  styleUrls: ['./details-menu.component.css']
})
export class DetailsMenuComponent implements OnInit, OnDestroy {
  faEye = faEye;

  idPlazoleta : any;
  idRestaurante: any;
  menu: Menu[];
  menuSubscriber : Subscription;
  constructor(private router : Router,
    private route : ActivatedRoute,
    private firestore: FirestoreService) { 
    this.idPlazoleta = this.route.snapshot.paramMap.get('id');
    this.idRestaurante = this.route.snapshot.paramMap.get('id2');
    this.getMenus();
  }

  ngOnInit(): void { 
  }
  ngOnDestroy(): void {
    if(this.menuSubscriber){
      this.menuSubscriber.unsubscribe();
    }
  }

  getMenus(){
    const path = "Plazoletas/"+this.idPlazoleta+"/Restaurantes/"+this.idRestaurante+"/Menus"     
    this.menuSubscriber = this.firestore.getCollection<Menu>(path).subscribe( res => {
      this.menu = res;
    })
  }
  verPlatillos(id3: any){
    const id = this.idPlazoleta;
    const id2 = this.idRestaurante;
    this.router.navigate(['/plazoletas/', id, id2, id3])
  }
}
