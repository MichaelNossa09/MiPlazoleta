import { Usuario } from 'src/app/models/usuario.model';
import { Injectable} from "@angular/core";

import { AngularFireDatabase , AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UsuariosService{
    private dbUsuarios = '/usuarios';
    misUsuariosRef: AngularFireList<Usuario>;

    constructor(private db: AngularFireDatabase){
        this.misUsuariosRef = db.list(this.dbUsuarios);
    }

      getAll(): AngularFireList<Usuario>{
        return this.misUsuariosRef;
      }
      create(usuario: Usuario): any{
        return this.misUsuariosRef.push(usuario);
      }
      update(id:string, value:any): Promise<void>{
        return this.misUsuariosRef.update(id, value);
      }
      delete(id: string) : Promise<void>{
        return this.misUsuariosRef.remove(id);
      }
      deteleAll(): Promise<void>{
        return this.misUsuariosRef.remove();  
      }
}    