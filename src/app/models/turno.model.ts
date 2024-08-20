import { Cliente } from "./cliente.model";

import { Vehiculo } from "./vehiculo.model";

import { Servicio } from "./servicio.model";


export class Turno {

    id? : number;               
    
    cliente: Cliente;

    vehiculo: Vehiculo;

    fecha: Date;

    motivoConsulta: string;

    servicios: Servicio[];
    
    hora?: Date;

    status: string;
  
    constructor(cliente: Cliente, motivoConsulta: string, servicios: Servicio[], fechaSeleccionada: Date) {
      this.cliente = cliente;
      this.motivoConsulta = motivoConsulta;
      this.servicios = servicios;
      this.fecha = fechaSeleccionada;
    }

}