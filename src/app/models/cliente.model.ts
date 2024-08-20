import { Persona } from "./persona.model";
import { Taller } from "./taller.model";
import { Vehiculo } from "./vehiculo.model";


export class Cliente {
 


    constructor(
        public id?: number,
        public persona?: Persona,
        public taller?: Taller,
        public vehiculos?: Vehiculo[]
      ) {

        this.id = id;
        this.persona = persona;
        this.taller = taller,
        this.vehiculos = vehiculos;

      }
    
}