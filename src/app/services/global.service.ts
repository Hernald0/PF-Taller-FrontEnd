import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Empleado } from '../models/empleado.model';
import { ClientesService } from './clientes.service';
import { Subject } from 'rxjs';
import { Vehiculo } from '../models/vehiculo.model';
import { TallerService } from './taller.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private datosSubject = new Subject<any>();

  constructor(private clientesService : ClientesService,
              private tallerService :  TallerService
  ) { }

  instanciarClasePorNombre(nombreClase: string, id: number): any | null {
    
    console.log('nombreClase:', nombreClase,id );

    const clasesDisponibles: { [key: string]: any } = {
      
      Cliente: Cliente,
      Empleado: Empleado,
      Vehiculo: Vehiculo
   
    };
  
    let claseSeleccionada = clasesDisponibles[nombreClase];
    

     
      switch ( nombreClase ) {
        case 'Cliente':
            // statement 1
            this.clientesService.getCliente(id).subscribe((cliente: Cliente) => {
              console.log('GlobalService.instanciarClasePorNombre devolucón del servicio',cliente );
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
        case 'Vehiculo':
             this.tallerService.getVehiculo(id).subscribe((vehiculo: Vehiculo) => {console.log('dato globalservice: ',vehiculo);
              this.datosSubject.next(vehiculo);
            });  
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
