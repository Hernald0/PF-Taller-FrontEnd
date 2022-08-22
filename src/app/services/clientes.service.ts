import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient
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

deleteCliente(id: number){
  console.log(this.endPoint+'/'+id);
  return this.http.delete(`${this.endPoint}/${id}`);
}
}
