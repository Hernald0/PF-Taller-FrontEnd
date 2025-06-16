import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { Venta } from '../../models/venta.model';
import { VentaService } from 'src/app/services/venta.service';
import { Usuario } from 'src/app/models/usuario.model';
 

//import { VENTAS_DUMMIES, Venta } from '../../models/venta.model';

@Component({
  selector: 'admin-ventas',
  templateUrl: './admin-ventas.component.html',
  styleUrls: ['./admin-ventas.component.css']
})
export class AdminVentasComponent implements OnInit {
  ventas: Venta[] = [];
  ventasFiltradas: Venta[] = [];
  ventasForm: FormGroup;

  constructor(private fb: FormBuilder,
              private VentasService : VentaService
  ) {
    this.ventasForm = this.fb.group({
      id: [''],
      cliente: [''],
      fechaEmision: [''],
      estado: [''],
      total: [''],
      usuario: [''],
      descuento: [''],
      iva: ['']
    });
  }

  ngOnInit(): void {
    this.VentasService.getVentasAll().subscribe(resp => {
      this.ventas = resp as Venta[];
      this.ventasFiltradas = [...this.ventas];
    });
    

    this.ventasForm.valueChanges.subscribe(() => {
      this.aplicarFiltros();
    });

  }


  
  aplicarFiltros(limpiar: boolean = false): void {
    if (limpiar) {
      this.ventasForm.reset();
      this.ventasFiltradas = [...this.ventas];
      return;
    }
    const { id, cliente, fecha, estado } = this.ventasForm.value;
    this.ventasFiltradas = this.ventas.filter(venta =>
      (!id || venta.id.toString().includes(id)) &&
      (!cliente || venta.cliente.persona.nombre.toLowerCase().includes(cliente.toLowerCase())) &&
      (!fecha || venta.fechaEmision === fecha) &&
      (!estado || venta.estado.toLowerCase().includes(estado.toLowerCase()))
    );
  }



  cancelar(venta: Venta): void {
    console.log('Cancelar venta:', venta);
  }
}