import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/compat/database';
import { Restaurant } from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private dbRestaurantes = '/restaurantes';
  misRestaurantesRef: AngularFireList<Restaurant>;
  constructor(private db: AngularFireDatabase) {
    this.misRestaurantesRef = db.list(this.dbRestaurantes);
   }
   getAll(): AngularFireList<Restaurant>{
    return this.misRestaurantesRef;
  }
  create(restaurant: Restaurant): any{
    return this.misRestaurantesRef.push(restaurant);
  }
  update(id:string, value:any): Promise<void>{
    return this.misRestaurantesRef.update(id, value);
  }
  delete(id: string) : Promise<void>{
    return this.misRestaurantesRef.remove(id);
  }
  deteleAll(): Promise<void>{
    return this.misRestaurantesRef.remove();  
  }
}
