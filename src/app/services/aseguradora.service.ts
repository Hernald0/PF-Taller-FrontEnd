import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Aseguradora } from '../models/aseguradora.model';

@Injectable({
  providedIn: 'root'
})
export class AseguradoraService {

  constructor(private http:HttpClient
    ) { }

endPoint: string = environment.baseUrl+"/Aseguradora";
formData:Aseguradora = new Aseguradora();
//listaAseguradoras: Aseguradora[];

postAseguradora(payload: Aseguradora) {
  console.log('Aseguradora Agregar:');
  console.log(payload);
   
  return this.http.post<Aseguradora>(this.endPoint, payload)
}

putAseguradora(Aseguradora: Aseguradora) {  
  return this.http.put<Aseguradora>(this.endPoint, Aseguradora)
}

getAseguradoras(){
  return this.http.get<Aseguradora[]>(this.endPoint);
          
}

getAseguradora(id: number):Observable<Aseguradora>{
  /*return this.http.get(`${this.baseUrl}/${id}`)
          .toPromise()
          .then(res => this.formData = res as Aseguradora);*/
  return this.http.get<Aseguradora>(`${this.endPoint}/${id}`)              
          //.map((response: Response) => response.json())
          //.toPromise()
          //.then(res => this.formData = res as Aseguradora)
          //.catch(this.errorHandler);
}

deleteAseguradora(id: number){
  console.log(this.endPoint+'/'+id);
  return this.http.delete(`${this.endPoint}/${id}`);
}


}
