import { Cliente } from "./cliente.model";
import { Empleado } from "./empleado.model";
import { Persona } from "./persona.model";

export class Taller {

    id : number;  
    nombreTaller : string;
    personaTitular : Persona;
    empleados : Empleado[];
    clientes : Cliente[];
}