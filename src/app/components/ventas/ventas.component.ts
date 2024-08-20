import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventaForm: FormGroup;
  items: any[] = [];
  vendedores: any[] = [];
  productos: any[] = [];
  tipos: any[] = [];
  cuentas: any[] = [];
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.ventaForm = this.fb.group({
      fechaEmision: [new Date()],
      vendedor: [''],
      cliente: [''],
      descuento: [''],
      efectivo: [''],
      cuentaCorriente: [''],
      observaciones: [''],
      comentarioInterno: ['']
    });

    // Dummy Data
    this.vendedores = [
      { label: 'Vendedor 1', value: '1' },
      { label: 'Vendedor 2', value: '2' }
    ];

    this.productos = [
      { label: 'Producto 1', value: '1' },
      { label: 'Producto 2', value: '2' }
    ];

    this.tipos = [
      { label: 'Servicio', value: 'Servicio' },
      { label: 'Producto', value: 'Producto' }
    ];

    this.cuentas = [
      { label: 'Cuenta 1', value: '1' },
      { label: 'Cuenta 2', value: '2' }
    ];

    this.items = [
      { producto: '', importe: 0, cantidad: 0, tipo: '', bonificacion: 0 }
    ];
  }

  calcularSubtotal(item) {
    return item.importe * item.cantidad;
  }

  calcularIVA(item) {
    return this.calcularSubtotal(item) * 0.21;
  }

  calcularRepuestos() {
    // Implementar lógica de cálculo
    return 0;
  }

  calcularManoDeObra() {
    // Implementar lógica de cálculo
    return 0;
  }

  calcularTotalNeto() {
    // Implementar lógica de cálculo
    return 0;
  }

  calcularTotal() {
    // Implementar lógica de cálculo
    return 0;
  }

  calcularTotalPago() {
    // Implementar lógica de cálculo
    return 0;
  }
}
