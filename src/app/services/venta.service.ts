import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Venta } from '../models/venta.model';
import { VentaDetalle } from '../models/ventaDetalle.model';

@Injectable({
  providedIn: 'root'
})



export class VentaService {

  endPoint: string = environment.baseUrl+"/Ventas";

  constructor(private http:HttpClient) { }

  

  modificarVenta(payload: Venta) {  
    return this.http.put<any>(this.endPoint+'/modificarVenta/', payload)
  }

 

  postVenta(payload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('se ejecuta postVenta'); 
    return this.http.post<any>(this.endPoint, payload, { headers });

    
  }

  getVentasAll(){
 

      return this.http.get<Venta[]>(this.endPoint );
            
  }
  
  cancelarVenta(id: number)
  {
 
    return this.http.put(`${this.endPoint}/cancelarVenta/${id}`, null);
            
  }
  
  getVenta(id: number)
  {
 
    return this.http.get(`${this.endPoint}/getVenta/${id}`);
            
  }

  getVentasDisponibles(fechaSeleccionada: string){
    console.log('Fecha que llega a getVentasDisponibles ', fechaSeleccionada);
    
    const params = new HttpParams()
      .set('fechaSeleccionada', fechaSeleccionada);
    
      return this.http.get<Venta[]>(this.endPoint+'/slots-disponibles/', {params} );
            
  }
  
  deleteVenta(id: number){
    
    return this.http.delete(`${this.endPoint}/${id}`);
  }

}
