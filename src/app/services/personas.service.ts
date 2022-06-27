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

postPersona(payload: Persona) {
  console.log('Persona Agregar:');
  console.log(payload);
   
  return this.http.post<Persona>(this.endPoint, payload)
}

putPersona(persona: Persona) {  
  return this.http.put<Persona>(this.endPoint, persona)
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
