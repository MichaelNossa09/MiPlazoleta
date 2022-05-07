import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeerJsService {

  constructor() { }

  carga(archivos : string[]){
    for( let archivo of archivos ){
      let script = document.createElement('script');
      script.src = "./assets/js/" + archivo + ".js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild( script );
    }
  }
  cargarClientId(archivos : string[]){
    for(let archivo of archivos){
      let script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=" + archivo;
      let body = document.getElementsByTagName("body")[0];
      body.appendChild( script );

      console.log(script);
      
    }
  }

}