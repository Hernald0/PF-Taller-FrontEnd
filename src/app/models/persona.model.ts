/*import { EstadoCivil } from "./EstadoCivil.model";
import { Genero } from "./genero.model";
import { Localidad } from "./localidad.model";
import { TipoIdentificador } from "./tipoidentificador.model";

export class Persona {

    id : number;               
    nombre : string;
    apellido : string;
    fecNacimiento : Date;
    direccion : string;
    barrio : string;
    dpto : string;   
    nroDireccion : number;
    piso : number;
    localidad : Localidad;
    telcelular : string;
    telfijo : string;
    tipoIdentificador : TipoIdentificador;
    nroIdentificacion : string;
    razonSocial : string;
    tipoPersona : string;
    idGenero : string;
    genero : Genero;
    email : string;
    ocupacion : string;
    estadoCivil : EstadoCivil;
    fechaAlta : Date;
    usrAlta : string;
    FechaBaja : Date;
    usrBaja : string;
    fechaMod : Date;
    usrMod : string;

}*/

import { EstadoCivil } from "./estadocivil.model";
import { Genero } from "./genero.model";
import { Localidad } from "./localidad.model";
import { TipoIdentificador } from "./tipoidentificador.model";

export class Persona {
  id: number;
  nombre: string;
  apellido: string;
  fecNacimiento: Date;
  direccion: string;
  barrio: string;
  dpto: string;
  nroDireccion: number;
  piso: number;
  localidad: Localidad;
  telcelular: string;
  telfijo: string;
  tipoIdentificador: TipoIdentificador;
  nroIdentificacion: string;
  razonSocial: string;
  tipoPersona: string;
  idGenero: string;
  genero: Genero;
  email: string;
  ocupacion: string;
  estadoCivil: EstadoCivil;
  fechaAlta: Date;
  usrAlta: string;
  FechaBaja: Date;
  usrBaja: string;
  fechaMod: Date;
  usrMod: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.apellido = '';
    this.fecNacimiento = new Date();
    this.direccion = '';
    this.barrio = '';
    this.dpto = '';
    this.nroDireccion = 0;
    this.piso = 0;
    this.localidad = new Localidad();
    this.telcelular = '';
    this.telfijo = '';
    this.tipoIdentificador = new TipoIdentificador();
    this.nroIdentificacion = '';
    this.razonSocial = '';
    this.tipoPersona = '';
    this.idGenero = '';
    this.genero = new Genero();
    this.email = '';
    this.ocupacion = '';
    this.estadoCivil = new EstadoCivil();
    this.fechaAlta = new Date();
    this.usrAlta = '';
    this.FechaBaja = new Date();
    this.usrBaja = '';
    this.fechaMod = new Date();
    this.usrMod = '';
  }

  
}