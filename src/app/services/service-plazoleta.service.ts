import { Injectable } from '@angular/core';
import { Plazoleta } from 'src/app/models/plazoleta.model';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ServicePlazoletaService {
  
  private dbPlazoletas = '/plazoletas';
  misPlazoletasRef: AngularFireList<Plazoleta>;


  constructor(private db: AngularFireDatabase) {
    this.misPlazoletasRef = db.list(this.dbPlazoletas)
   }

   getAll(): AngularFireList<Plazoleta>{
     return this.misPlazoletasRef;
   }
   create(plazoleta: Plazoleta): any{
     return this.misPlazoletasRef.push(plazoleta);
   }
   update(id:string, value:any): Promise<void>{
     return this.misPlazoletasRef.update(id, value);
   }
   delete(id: string) : Promise<void>{
     return this.misPlazoletasRef.remove(id);
   }
   deteleAll(): Promise<void>{
     return this.misPlazoletasRef.remove();  
   }
}
