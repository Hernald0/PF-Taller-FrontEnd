import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Turno } from '../models/turno.model';
import { RecepcionVehiculo } from '../models/recepcionVehiculo.model';

@Injectable({
  providedIn: 'root'
})



export class TurnoService {

  endPoint: string = environment.baseUrl+"/Turno";

  constructor(private http:HttpClient) { }

  
  recepcionTurno(payload: any) {  
    return this.http.post<any>(this.endPoint+'/recepcionTurno/', payload)
  }

  modificarTurno(payload: Turno) {  
    return this.http.put<any>(this.endPoint+'/modificarTurno/', payload)
  }

  postTurno(payload: any) {  
    return this.http.post<any>(this.endPoint, payload)
  }

  getTurno(id: number){

      //return this.http.get(`${this.endPoint}/${id}`, null);
      return this.http.get< RecepcionVehiculo>(`${this.endPoint}/${id}`);
            
  }

  getTurnosAll(){
 
      return this.http.get<Turno[]>(this.endPoint+'/turnosAll/' );            
  }
  
  cancelarTurno(id: string)
  {
 
    return this.http.put(`${this.endPoint}/cancelarTurno/${id}`, null);
            
  }

  getTurnosDisponibles(fechaSeleccionada: string){
    console.log('Fecha que llega a getTurnosDisponibles ', fechaSeleccionada);
    
    const params = new HttpParams()
      .set('fechaSeleccionada', fechaSeleccionada);
    
      return this.http.get<Turno[]>(this.endPoint+'/slots-disponibles/', {params} );
            
  }
  
  deleteTurno(id: number){
    
    return this.http.delete(`${this.endPoint}/${id}`);
  }

}
