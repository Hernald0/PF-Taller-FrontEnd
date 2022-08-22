import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Marca } from '../models/marca.model';
import { Modelo } from '../models/modelo.model';

@Injectable({
  providedIn: 'root'
})
export class MarcamodeloService {

  constructor(private http:HttpClient
    ) { }

endPoint: string = environment.baseUrl+"/Taller/marcavehiculo";
formData:Marca = new Marca();
 

postMarca(payload: Marca) {
  console.log('Marca Agregar:');
  console.log(payload);
   
  return this.http.post<Marca>(this.endPoint, payload)
}

putMarca(marca: Marca) {  
  return this.http.put<Marca>(this.endPoint, marca)
}

getMarcas(){
  return this.http.get<Marca[]>(this.endPoint);
          
}

getMarca(id: number):Observable<Marca>{
  /*return this.http.get(`${this.baseUrl}/${id}`)
          .toPromise()
          .then(res => this.formData = res as Marca);*/
  return this.http.get<Marca>(`${this.endPoint}/${id}`)              
          //.map((response: Response) => response.json())
          //.toPromise()
          //.then(res => this.formData = res as Marca)
          //.catch(this.errorHandler);
}

deleteMarca(id: number){
  console.log(this.endPoint+'/'+id);
  return this.http.delete(`${this.endPoint}/${id}`);
}

/*******************************************************/
postModelo(payload: Modelo) {
  console.log('Modelo Agregar:');
  console.log(payload);
   
  return this.http.post<Modelo>(this.endPoint, payload)
}

putModelo(marca: Modelo) {  
  return this.http.put<Modelo>(this.endPoint, marca)
}

getModelos(){
  return this.http.get<Modelo[]>(this.endPoint);
          
}

getModelo(id: number):Observable<Modelo>{
  
  return this.http.get<Modelo>(`${this.endPoint}/${id}`)              
          
}

deleteModelo(id: number){
  console.log(this.endPoint+'/'+id);
  return this.http.delete(`${this.endPoint}/${id}`);
}
/*******************************************************/
errorHandler(error: Response) {  
  console.log(error);  
  return Observable.throw(error);  
}  

}