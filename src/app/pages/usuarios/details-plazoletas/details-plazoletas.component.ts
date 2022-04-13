import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Restaurant } from 'src/app/models/restaurant.model';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-details-plazoletas',
  templateUrl: './details-plazoletas.component.html',
  styleUrls: ['./details-plazoletas.component.css']
})
export class DetailsPlazoletasComponent implements OnInit {
  faEye = faEye;
  id: any;
  restaurants: Restaurant[];
  constructor(
    private router: Router,
    private rout: ActivatedRoute,
    private firestore: FirestoreService,
    private carrito : CarritoService) {
      this.id = this.rout.snapshot.paramMap.get('id')
      this.getRestaurant();
    }
    ngOnInit(): void {

    }

    getRestaurant(){
      const path = "Plazoletas/"+this.id+"/Restaurantes"     
      this.firestore.getCollection<Restaurant>(path).subscribe( res => {
        this.restaurants = res;
      })
    }
    enviarId(id2: any){
      const id = this.id;
      this.carrito.getRestaurant(id, id2);
      this.router.navigate(['/plazoletas', id,id2])
    }
  }


