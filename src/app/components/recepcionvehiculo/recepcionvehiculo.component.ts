import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recepcionvehiculo',
  templateUrl: './recepcionvehiculo.component.html',
  styleUrls: ['./recepcionvehiculo.component.css']
})
export class RecepcionvehiculoComponent {
  fechaIngreso: Date;
  fechaEgreso: Date;
  tecnicos = [{ label: 'Técnico 1', value: 1 }, { label: 'Técnico 2', value: 2 }];
  tecnicoSeleccionado: any;
  
  conceptos = [{ label: 'Reparación', value: 1 }, { label: 'Mantenimiento', value: 2 }];
  conceptoSeleccionado: any;

  combustibles = [{ label: 'Bajo', value: 1 }, { label: 'Medio', value: 2 }, { label: 'Alto', value: 3 }];
  combustibleSeleccionado: any;

  kilometraje: number;
  nombreInspector: string;
  cambiarAceite: boolean = false;
  chaperia: boolean = false;

  items = [
    { nombre: '', importe: 0, cantidad: 1, tipo: '', bonificacion: 0, subtotal: 0 }
  ];

  filteredItems: any[];

  allItems = [
    { nombre: 'Cambio de Aceite', importe: 130, tipo: 'Servicio' },
    { nombre: 'Chapería', importe: 12000, tipo: 'Servicio' },
    { nombre: 'Filtro de Aire', importe: 300, tipo: 'Repuesto' },
    { nombre: 'Pastillas de Freno', importe: 800, tipo: 'Repuesto' }
  ];

  search(event) {
    this.filteredItems = this.allItems.filter(item => item.nombre.toLowerCase().includes(event.query.toLowerCase()));
  }

  onSelectItem(event, rowIndex) {
    const selectedItem = event;
    this.items[rowIndex].importe = selectedItem.importe;
    this.items[rowIndex].tipo = selectedItem.tipo;
    this.updateSubtotal(rowIndex);
  }

  updateSubtotal(rowIndex) {
    const item = this.items[rowIndex];
    item.subtotal = (item.importe * item.cantidad) - item.bonificacion;
  }

  addItem() {
    this.items.push({ nombre: '', importe: 0, cantidad: 1, tipo: '', bonificacion: 0, subtotal: 0 });
  }

  deleteItem(rowIndex: number) {
    this.items.splice(rowIndex, 1);
  }

  resumen = {
    descuento: 0,
    repuestos: 12000,
    manoObra: 130,
    totalNeto: 12130,
    iva: 0,
    total: 12130
  };

  pago = {
    efectivo: 0,
    cuentaCorriente: null,
    total: 0
  };

  cuentasCorrientes = [{ label: 'Cuenta 1', value: 1 }, { label: 'Cuenta 2', value: 2 }];
  observaciones: string;
}