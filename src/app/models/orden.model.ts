import { Cliente } from "./cliente.model";
import { RecepcionVehiculo } from "./recepcionVehiculo.model";
import { VentaDetalle } from "./ventaDetalle.model";

export class Orden extends RecepcionVehiculo  {
    /*id: number;
    cliente: Cliente;
    fechaEmision: string;
    montoTotal: number;
    iva: number;
    descuento: number;
    
    items: VentaDetalle[];
    efectivo: number;
    tarjetaCredito: string;
    montoTarjetaCredito: number;
    cuentaCorriente: number;
    usuario: string;
    observaciones: string;
    tipoOperacion: string;
    nroVenta: number;
    nrooperacion: number; */
    tecnicoAsignado: string;
    observacionesTecnico: string;
    estado: string;
    montoTotal: number;
    iva: number;
    descuento: number;

}