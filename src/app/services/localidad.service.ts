import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Localidad } from '../models/localidad.model';
import { Provincia } from '../models/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private http:HttpClient) { }

  endPoint: string = environment.baseUrl+"/Pais";
  
  getProvincias(idPais: number){
    
    return this.http.get<Provincia[]>(`${this.endPoint}/Provincias/${idPais}`)              
    
  }

   
  getLocalidades(cadena: string){
   
    return this.http.get<Localidad[]>(`${this.endPoint}/Localidades/${cadena}`)              
         
  }

}
