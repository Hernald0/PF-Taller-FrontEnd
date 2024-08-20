import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente.model';
import { Vehiculo } from '../models/vehiculo.model';
import { Persona } from '../models/persona.model';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {


 
constructor(private http: HttpClient
    ) { }

endPoint: string = environment.baseUrl+"/Cliente";
formData: Cliente = new Cliente();
//listaClientes: Cliente[];

postCliente(payload: Cliente) {
  console.log('Cliente Agregar:');
  console.log(payload);
   
  return this.http.post<Cliente>(this.endPoint, payload)
}

putCliente(Cliente: Cliente) {  
  return this.http.put<Cliente>(this.endPoint, Cliente)
}

getClientes(){
  return this.http.get<Cliente[]>(this.endPoint);
          
}

getClienteByIdentificador(tipoIdentificador: string, nroIdentificacion: string){
  console.log('tipoIdentificador ', tipoIdentificador, nroIdentificacion);
  const params = new HttpParams()
      .set('IdTipoIdentificador', tipoIdentificador)
      .set('NroIdentificador', nroIdentificacion);
  return this.http.get<Cliente>(this.endPoint+'/GetClienteByIdentificacion', { params } );   
 
}


getCliente(id: number):Observable<Cliente>{
  /*return this.http.get(`${this.baseUrl}/${id}`)
          .toPromise()
          .then(res => this.formData = res as Cliente);*/
  return this.http.get<Cliente>(`${this.endPoint}/${id}`)              
          //.map((response: Response) => response.json())
          //.toPromise()
          //.then(res => this.formData = res as Cliente)
          //.catch(this.errorHandler);
}

getClienteByIdentificacion(nroIdentificacion: number):Observable<Cliente>{
  /*return this.http.get(`${this.baseUrl}/${id}`)
          .toPromise()
          .then(res => this.formData = res as Cliente);*/
  return this.http.get<Cliente>(`${this.endPoint}/GetClienteByIdentificacion/${nroIdentificacion}`)              
          //.map((response: Response) => response.json())
          //.toPromise()
          //.then(res => this.formData = res as Cliente)
          //.catch(this.errorHandler);
}

deleteCliente(id: number){
  console.log(this.endPoint+'/'+id);
  return this.http.delete(`${this.endPoint}/${id}`);
}

deleteClienteVehiculo(idVehiculo: number){
  console.log(`${this.endPoint}/deleteClienteVehiculo/${idVehiculo}`);
  return this.http.delete(`${this.endPoint}/deleteClienteVehiculo/${idVehiculo}`);
}

postVehiculoCliente(pPayload: any) {
  return this.http.post<Cliente>(this.endPoint+'/nuevoVehiculo', pPayload )
}

putVehiculoCliente(pPayload: any) {
  return this.http.put<Cliente>(this.endPoint+'/actualizarVehiculo', pPayload)
}
}
