import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/empleado.model';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class TallerService {

  constructor(private http:HttpClient
    ) { }

  endPoint: string = environment.baseUrl+"/Taller";
  formData: Empleado = new Empleado();
  //listaEmpleados: Empleado[];

  postEmpleado(payload: Empleado) {
    console.log('Empleado Agregar:');
    console.log(payload);
    
    return this.http.post<Empleado>(this.endPoint, payload)
  }

  putEmpleado(Empleado: Empleado) {  
    return this.http.put<Empleado>(this.endPoint, Empleado)
  }

  getEmpleados(){
    return this.http.get<Empleado[]>(this.endPoint+'/empleados/1');
            
  }

  getEmpleado(id: number):Observable<Empleado>{
    /*return this.http.get(`${this.baseUrl}/${id}`)
            .toPromise()
            .then(res => this.formData = res as Empleado);*/
    return this.http.get<Empleado>(`${this.endPoint}/${id}`)              
            //.map((response: Response) => response.json())
            //.toPromise()
            //.then(res => this.formData = res as Empleado)
            //.catch(this.errorHandler);
  }

  deleteEmpleado(id: number){
    console.log(this.endPoint+'/'+id);
    return this.http.delete(`${this.endPoint}/${id}`);
  }

  getVehiculo(id: number){
     
    return this.http.get<Vehiculo>(`${this.endPoint}/Vehiculo/${id}`);
  } 

}
