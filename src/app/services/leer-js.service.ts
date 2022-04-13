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
  carga2(){
    let script = document.createElement('script');
    script.src = "https://unpkg.com/swiper/swiper-bundle.min.js"
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(script)
  }
}