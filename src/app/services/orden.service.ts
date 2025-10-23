import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Orden } from '../models/orden.model';
//import { OrdenDetalle } from '../models/ventaDetalle.model';

@Injectable({
  providedIn: 'root'
})



export class OrdenService {

  endPoint: string = environment.baseUrl+"/Orders";

  constructor(private http:HttpClient) { }

  

  modificarOrden(payload: Orden) {  
    return this.http.put<any>(this.endPoint+'/modificarOrden/', payload)
  }

 

  postOrden(payload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('se ejecuta postOrden'); 
    return this.http.post<any>(this.endPoint+'/postOrden/', payload, { headers });

    
  }

  getOrdenAll(){
 

      return this.http.get<Orden[]>(this.endPoint+'/ordersAll' );
            
  }
  
  cancelarOrden(id: number)
  {
 
    return this.http.put(`${this.endPoint}/cancelarOrden/${id}`, null);
            
  }
  
  getOrden(id: number)
  {
    
    return this.http.get(`${this.endPoint}/getOrden/${id}`);
            
  }

  getOrdenDisponibles(fechaSeleccionada: string){
    console.log('Fecha que llega a getOrdenDisponibles ', fechaSeleccionada);
    
    const params = new HttpParams()
      .set('fechaSeleccionada', fechaSeleccionada);
    
      return this.http.get<Orden[]>(this.endPoint+'/slots-disponibles/', {params} );
            
  }
  
  deleteOrden(id: number){
    
    return this.http.delete(`${this.endPoint}/${id}`);
  }

}
