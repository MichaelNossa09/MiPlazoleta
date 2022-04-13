import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore : AngularFirestore) { }

  createDoc(data: any, path: string, id: any){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data)
  }

  getId(){
    return this.firestore.createId();
  }
  getCollection<tipo>(path: string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }
  getDoc<tipo>(path: string, id: any){
      return this.firestore.collection(path).doc<tipo>(id).valueChanges()
  }
  deleteDoc<tipo>(path: string, id: any){
    return this.firestore.collection(path).doc<tipo>(id).delete();
  }
  updateDoc<tipo>(data: any, path: string, id: any){
    return this.firestore.collection(path).doc<tipo>(id).update(data)
  }
}
