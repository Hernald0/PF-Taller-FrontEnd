import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopUpDatosService {

  //private datosFuente = new BehaviorSubject<any[]>([]);
  //datos$ = this.datosFuente.asObservable();
  endPoint: string = environment.baseUrl+"/VistasPopUp";
  
  constructor (private http:HttpClient){};
  
  cargarDatos(tipo: string): Observable<any>{
    console.log('cargarDatos');

    return this.getDatosVistaPopUp(tipo);
    /*
    this.getDatosVistaPopUp(tipo).subscribe( res => { 
      console.log('cargarDatos dentro');
      console.log(res);
      return res;
      //this.datosFuente.next(datos);
    }, 
    (error) => {
      console.error('Error al obtener datos:', error);
    });*/
  }

  private obtenerDatos(tipo: string): any[] {
    // Lógica para obtener datos según el tipo (simulada aquí)
    if (tipo === 'clientes') {
      return [{ id: 1, nombre: 'Cliente 1' }, { id: 2, nombre: 'Cliente 2' }];
    } else if (tipo === 'empleados') {
      return [{ id: 1, nombre: 'Empleado 1' }, { id: 2, nombre: 'Empleado 2' }];
    } else if (tipo === 'productos') {
      return [{ id: 1, nombre: 'Producto 1' }, { id: 2, nombre: 'Producto 2' }];
    }
    // Puedes agregar más casos según sea necesario.
    return [];
  }

  getDatosVistaPopUp(nombreVistaPopUp: string ){
    console.log('getDatosVistaPopUp');
    console.log(nombreVistaPopUp);
    return this.http.get<any>(`${this.endPoint}/${nombreVistaPopUp}`);     
  }



}