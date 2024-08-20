import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orden',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {
  form: FormGroup;
  tecnicos = [{ label: 'Técnico 1', value: 1 }, { label: 'Técnico 2', value: 2 }];
  conceptos = [{ label: 'REPARACIÓN', value: 'REPARACIÓN' }, { label: 'MANTENIMIENTO', value: 'MANTENIMIENTO' }];
  combustibles = [{ label: 'Bajo', value: 'Bajo' }, { label: 'Medio', value: 'Medio' }];
  items = [{ producto: '', importe: 0, cantidad: 1, tipo: 'Servicio', bonificacion: 0, subtotal: 0, iva: 0 }];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fechaIngreso: [null],
      fechaEgreso: [null],
      tecnico: [null],
      cliente: [''],
      vehiculo: [''],
      concepto: [''],
      combustible: [''],
      kilometraje: [''],
      inspector: [''],
      siniestro: [''],
      observaciones: [''],
      comentarioInterno: ['']
    });
  }

  agregarItem() {
    this.items.push({
      producto: '',
      importe: 0,
      cantidad: 1,
      tipo: 'Servicio',
      bonificacion: 0,
      subtotal: 0,
      iva: 0
    });
  }
}
