import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePlazoletaService } from '../../services/service-plazoleta.service';
import { Plazoleta } from '../../models/plazoleta.model'
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-details-plazoletas',
  templateUrl: './details-plazoletas.component.html',
  styleUrls: ['./details-plazoletas.component.css']
})
export class DetailsPlazoletasComponent implements OnInit {

  plazoletas?: Plazoleta[];
  plazoleta?: Plazoleta;
  plazoletaIndex = -1;
  titulo : string;

  constructor(private plazoletaService : ServicePlazoletaService,
    private router: Router) { }
  ngOnInit(): void {
    this.recibirDatosBD();
  }
  
  refrescarPlazoletas(): void{
    this.plazoleta = undefined;
    this.plazoletaIndex = -1;
    this.recibirDatosBD();
  }
  recibirDatosBD(): void{
    this.plazoletaService.getAll().snapshotChanges().pipe(
      map(cambiar => cambiar.map(c => ({
        id: c.payload.key, ...c.payload.val()
      })))
    ).subscribe(data =>{
      this.plazoletas = data;
    })
  }

  eliminarTodo():void{
    this.plazoletaService.deteleAll().then( () => this.refrescarPlazoletas())
    .catch(err => console.log(err))
  }
  configuracionPlazoleta(plazoletas : Plazoleta, index: number): void{
   this.plazoleta = plazoletas;
   this.plazoletaIndex = index;
   console.log(this.plazoleta, this.plazoletaIndex);
   this.router.navigate(['/plazoleta/:id', index])
  }

}
