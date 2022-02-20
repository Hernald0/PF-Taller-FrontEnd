import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http:HttpClient
    ) { }

endPoint: string = environment.baseUrl+"/persona";
formData:Persona = new Persona();
//listaPersonas: Persona[];

postPersona() {
  console.log('llega al servicio');
  console.log( this.formData);
  return this.http.post(this.endPoint, this.formData)
}

putPersona(/*pPersona: Persona*/) {
  //return this.http.put(this.baseUrl, pPersona)
  console.log( this.formData);
  return this.http.put(`${(this.endPoint)}/${this.formData.id}`, this.formData)
}

getPersonas(){
  return this.http.get<Persona[]>(this.endPoint);
          
}

getPersona(id: number):Observable<Persona>{
  /*return this.http.get(`${this.baseUrl}/${id}`)
          .toPromise()
          .then(res => this.formData = res as Persona);*/
  return this.http.get<Persona>(`${this.endPoint}/${id}`)              
          //.map((response: Response) => response.json())
          //.toPromise()
          //.then(res => this.formData = res as Persona)
          //.catch(this.errorHandler);
}

deletePersona(id: number){
  console.log(this.endPoint+'/'+id);
  return this.http.delete(`${this.endPoint}/${id}`);
}

 

errorHandler(error: Response) {  
  console.log(error);  
  return Observable.throw(error);  
}  
}
