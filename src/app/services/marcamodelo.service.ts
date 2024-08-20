import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Marca } from '../models/marca.model';
import { Modelovehiculo } from '../models/modelovehiculo.model';
import { mvvmModelovehiculo } from '../models/mvvmModeloVehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class MarcamodeloService {

  constructor(private http:HttpClient
    ) { }

endPoint: string = environment.baseUrl+"/Taller/";
formData:Marca = new Marca();
 

postMarca(payload: Marca) {
  console.log('Marca Agregar:');
  console.log(payload);
   
  return this.http.post<Marca>(this.endPoint+'updModeloVehiculo', payload)
}

putMarca(marca: Marca) {  
  return this.http.put<Marca>(this.endPoint, marca)
}

getMarcas(){
  return this.http.get<Marca[]>(this.endPoint+"marcaVehiculo");
          
}

getMarca(id: number):Observable<Marca>{
  /*return this.http.get(`${this.baseUrl}/${id}`)
          .toPromise()
          .then(res => this.formData = res as Marca);*/
          console.log(this.endPoint + "marcaModelosVehiculo/"+ id);
  return this.http.get<Marca>(this.endPoint + 'marcaModelosVehiculo/'+ id)              
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
postModelo(payload: mvvmModelovehiculo) {
  console.log('Modelo Agregar:');
  console.log(payload);
   
  return this.http.post<Modelovehiculo>(this.endPoint+"modelovehiculo", payload)
}

putModelo(payload: mvvmModelovehiculo) {  
  return this.http.put<Modelovehiculo>(this.endPoint + "updModeloVehiculo/", payload)
}

getModelos(idMarca: number){
  console.log(`${this.endPoint}+"modelos/"+${idMarca}`);
  return  this.http.get<Marca>(`${this.endPoint}marcaModelosVehiculo/${idMarca}`) ;
}

getModelo(id: number):Observable<Modelovehiculo>{
  
  return this.http.get<Modelovehiculo>(`${this.endPoint}+/${id}`)              
          
}

deleteModelo(id: number){
  console.log("url: "+ this.endPoint + "delModeloVehiculo/"+ id);
  return this.http.delete(this.endPoint + "delModeloVehiculo/"+ id);
}
/*******************************************************/
errorHandler(error: Response) {  
  console.log(error);  
  return Observable.throw(error);  
}  

}