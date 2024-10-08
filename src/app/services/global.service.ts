import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Empleado } from '../models/empleado.model';
import { ClientesService } from './clientes.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private datosSubject = new Subject<any>();

  constructor(private clientesService : ClientesService) { }

  instanciarClasePorNombre(nombreClase: string, id: number): any | null {
    
    console.log('nombreClase:', nombreClase,id );

    const clasesDisponibles: { [key: string]: any } = {
      
      Cliente: Cliente,
      Empleado: Empleado
   
    };
  
    let claseSeleccionada = clasesDisponibles[nombreClase];
    

     
      switch ( nombreClase ) {
        case 'Cliente':
            // statement 1
            this.clientesService.getCliente(id).subscribe((cliente: Cliente) => {
              this.datosSubject.next(cliente);
            }); 
            /*
             this.clientesService.getCliente(id).subscribe(res => {     
              
              claseSeleccionada = res;       
              
            }); */

            break;
        case 'Empleado':
            // statement 2
            break;
       
     }
  
    if (claseSeleccionada) {
      return  claseSeleccionada;
    } else {
      
      console.error('Clase no encontrada');
      return null;
    }
  }
  
  instanciarClasePorNombreObservable() {
    return this.datosSubject.asObservable();
  }

}
