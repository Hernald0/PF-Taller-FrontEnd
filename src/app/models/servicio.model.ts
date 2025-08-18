export class Servicio {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public duracionAproxima: number;
  public tipo: string;
  public precioCosto: number;
  public precioVenta: number;
  public fechaAlta?: Date;
  public usuarioAlta?: string;
  public fechaBaja?: Date;
  public usuarioBaja?: string;
  public checked: boolean;

  constructor(
    id?: number,
    nombre?: string,
    descripcion?: string,
    checkedOrFechaAlta?: boolean | Date,
    usuarioAlta?: string,
    fechaBaja?: Date,
    usuarioBaja?: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;

    if (typeof checkedOrFechaAlta === 'boolean') {
      this.checked = checkedOrFechaAlta;
    } else {
      this.fechaAlta = checkedOrFechaAlta;
      this.usuarioAlta = usuarioAlta;
      this.fechaBaja = fechaBaja;
      this.usuarioBaja = usuarioBaja;
      this.checked = false;
    }
  }
}