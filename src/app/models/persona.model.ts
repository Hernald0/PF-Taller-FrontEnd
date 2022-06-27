import { EstadoCivil } from "./EstadoCivil.model";
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

}