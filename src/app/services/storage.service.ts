import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage : AngularFireStorage) { }

  storageRef = this.storage.storage.ref();
  async subirImagen(date:string, imgBase64: any, path: string){
    try {
      let respuesta = await this.storageRef.child(path+date).putString(imgBase64, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (error) {
      console.log("Error: "+error);
      return null
    }
  }
}
