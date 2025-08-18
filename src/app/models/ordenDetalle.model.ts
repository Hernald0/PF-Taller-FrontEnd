export interface VentaDetalle {
    Id: number;
    servicioId?: number;
    repuestoId?: number;
    nombre: string;
    tipo?: string;
    cantidad: number;
    iva: number;
    importe: number;
    bonificacion:number;
    precioUnitario: number;
    descuento: number;
    subtotal: number;
    ventaId?: number;
  }