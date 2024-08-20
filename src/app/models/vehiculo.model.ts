import { Modelovehiculo } from "./modelovehiculo.model";

export class Vehiculo {
    
     id : number;
     
     modelovehiculo: Modelovehiculo; 
     
     patente: string; 

     numeroSerie: string;  

     anio: number; 

     color: string;

     constructor(patente?: string, marca?: string, modelo?: string) {
      this.patente = patente;
       
    }

  }