import { Cliente } from "./cliente.model";

export class Orden {
    id: number;
    cliente: Cliente;
    fechaEmision: string;
    montoTotal: number;
    iva: number;
    descuento: number;
    estado: string;
    //items: VentaDetalle[];
    efectivo: number;
    tarjetaCredito: string;
    montoTarjetaCredito: number;
    cuentaCorriente: number;
    usuario: string;
    observaciones: string;
    tipoOperacion: string;
    nroVenta: number;
    nrooperacion: number; 
}