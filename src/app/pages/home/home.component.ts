import { DataServices } from './../../components/services/data.services';
import { Component, Input, OnInit } from '@angular/core';
import { AuthServices } from '../../components/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listadoPlazoletas: any;
  constructor(private authService : AuthServices, 
    private dataServices: DataServices) { }

  ngOnInit(): void {
    this.dataServices.cargarPlazoletas().subscribe(res=>{
      this.listadoPlazoletas= res;
    });
  }
}
