import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Restaurant } from 'src/app/models/restaurant.model';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-details-plazoletas',
  templateUrl: './details-plazoletas.component.html',
  styleUrls: ['./details-plazoletas.component.css']
})
export class DetailsPlazoletasComponent implements OnInit {
  faEye = faEye;
  id: any;
  restaurants: Restaurant[];
  plazoletasSubscriber : Subscription;
  constructor(
    private router: Router,
    private rout: ActivatedRoute,
    private firestore: FirestoreService) {
      this.id = this.rout.snapshot.paramMap.get('id')
      this.getRestaurant();
    }
    ngOnInit(): void {

    }
    ngOnDestroy(): void {
      if(this.plazoletasSubscriber){
        this.plazoletasSubscriber.unsubscribe();
      }
    }

    getRestaurant(){
      const path = "Plazoletas/"+this.id+"/Restaurantes"     
      this.plazoletasSubscriber = this.firestore.getCollection<Restaurant>(path).subscribe( res => {
        this.restaurants = res;
      })
    }
    enviarId(id2: any){
      const id = this.id;
      this.router.navigate(['/plazoletas', id,id2])
    }
  }


