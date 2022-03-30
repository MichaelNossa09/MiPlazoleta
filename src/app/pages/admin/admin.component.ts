import { Component, OnInit } from '@angular/core';
import { ServicePlazoletaService } from 'src/app/services/service-plazoleta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plazoleta } from 'src/app/models/plazoleta.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  plazoleta : Plazoleta = new Plazoleta();
  datosSuministrados = false;
  
  constructor(private router : Router, 
    private plazoletaService: ServicePlazoletaService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.plazoletaService.getAll());
  }

  guardarPlazoletasCreadas(): void{
    this.plazoletaService.create(this.plazoleta).then(() =>{
      console.log("Plazoleta Guardada con Éxito");
      this.datosSuministrados = true;
    })
  }
  nuevaPlazoleta(): void{
    this.datosSuministrados = false;
    this.plazoleta = new Plazoleta();
  }
}
