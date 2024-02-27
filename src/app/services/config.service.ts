import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http:HttpClient) { }

  endPoint: string = environment.baseUrl+"/VistasPopUp";
  
  getDatos(pNombreVista: string ){
    return this.http.get(`${this.endPoint}/${pNombreVista}`)
  }

}
