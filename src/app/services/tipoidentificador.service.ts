import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoIdentificador } from '../models/tipoidentificador.model';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificadorService {

  
    constructor(private http:HttpClient
      ) { }

      endPoint: string = environment.baseUrl+"/TipoIdentificador";
      formData:TipoIdentificador = new TipoIdentificador();
      //listaTipoIdentificadors: TipoIdentificador[];

      postTipoIdentificador(payload: TipoIdentificador) {
        
        return this.http.post<TipoIdentificador>(this.endPoint, payload)
      }

      putTipoIdentificador(TipoIdentificador: TipoIdentificador) {  
        return this.http.put<TipoIdentificador>(this.endPoint, TipoIdentificador)
      }

      getTipoIdentificadors(){
        return this.http.get<TipoIdentificador[]>(this.endPoint);
                
      }

      getTipoIdentificador(id: number):Observable<TipoIdentificador>{
      
        return this.http.get<TipoIdentificador>(`${this.endPoint}/${id}`)              
        
      }

      deleteTipoIdentificador(id: number){
        console.log(this.endPoint+'/'+id);
        return this.http.delete(`${this.endPoint}/${id}`);
      }


      errorHandler(error: Response) {  
        console.log(error);  
        return Observable.throw(error);  
    }  
}
