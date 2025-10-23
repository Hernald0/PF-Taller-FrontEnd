 
import { Turno } from "./turno.model";
 


export class RecepcionVehiculo extends Turno {
  fechaRecepcion!: Date;
  horaRecepcion!: string;
  combustible?: number;
  kilometraje?: number;
  idAseguradora?: number;
  inspector?: string;
  nroSiniestro?: string;
  franquicia?: number;
  
}