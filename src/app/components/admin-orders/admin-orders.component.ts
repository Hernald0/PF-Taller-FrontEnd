import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { Orden } from '../../models/orden.model';
import { OrdenService } from 'src/app/services/orden.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  ordenes: Orden[] = [];
  ordenesFiltradas: Orden[] = [];
  ordenesForm: FormGroup;
  estados: { label: string, value: string }[] = [
    { label: 'Cancelado', value: 'cancelado' },
    { label: 'Orden', value: 'orden' },
    { label: 'Presupuesto', value: 'presupuesto' }
  ];


  constructor(private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private OrdenesService : OrdenService,
              private messageService: MessageService,
              private router: Router
  ) {
    this.ordenesForm = this.fb.group({
      id: [''],
      cliente: [''],
      fechaEmision: [''],
      estado: [this.estados],
      montoTotal: [''],
      usuario: [''],
      descuento: [''],
      iva: ['']
    });
  }

  ngOnInit(): void {
    
    this.OrdenesService.getOrdenAll().subscribe(resp => {
      this.ordenes = resp as Orden[];
      console.log(this.ordenes);
      this.ordenesFiltradas = [...this.ordenes];
    });
    

    this.ordenesForm.valueChanges.subscribe(() => {
      this.aplicarFiltros();
    });

  }


  
  aplicarFiltros(limpiar: boolean = false): void {
    if (limpiar) {
      this.ordenesForm.reset();
      this.ordenesFiltradas = [...this.ordenes];
      return;
    }
    const { id, cliente, fecha, estado, montoTotal } = this.ordenesForm.value;

    console.log('Estado en formulario:', this.ordenesForm.value.estado);
    console.log('Tipo:', typeof this.ordenesForm.value.estado);
    console.log('Tipo:', fecha);
    
    this.ordenesFiltradas = this.ordenes.filter(orden =>
      (!id || orden.id.toString().includes(id)) &&
      (!cliente || orden.cliente.persona.nombre.toLowerCase().includes(cliente.persona.nombre.toLowerCase())) &&
      (!montoTotal || orden.montoTotal === montoTotal) &&
      (!fecha || orden.fecha === fecha) &&
      (!estado || (typeof orden.estado === 'string' && orden.estado.toLowerCase().includes(estado.toLowerCase())))
      //(!estado.value || (orden.estado && orden.estado.toLowerCase().includes(estado.toLowerCase())))
      //(!estado || orden.estado.toLowerCase().includes(estado.value.toLowerCase()) )
    );
   
  }

 verDetalle(orden: Orden) {
  console.log('orden: ', orden);
  this.router.navigate(['/orden', orden.id], { queryParams: { modo: 'ver' } });
  }
  
  cancelar(orden: Orden): void {
   
    // Cambia el estado del turno a cancelado
    orden.estado = 'cancelado';
    this.confirmationService.confirm({
      message: '¿Desea cancelar el presupuesto de: '+ orden.cliente.persona.nombre + ' - ' + orden.id + '"?',
      accept: () => {
          this.OrdenesService.cancelarOrden(orden.id).subscribe(
            
                (response) => {
                  // Aquí puedes verificar si el backend devuelve algún tipo de respuesta
                  // Si la respuesta es exitosa, muestra el mensaje de éxito
                  this.messageService.add({ 
                      severity: 'success', 
                      summary: 'Presupuesto cancelado.', 
                      detail: 'Se canceló correctamente el presupueso de ' + orden.cliente.persona.nombre + ' - ' + orden.id + '.' 
                  });
                  
                  // Actualiza el estado del turno a 'Cancelado'
                  orden.estado = 'cancelado';
                  
           
                  this.ordenes = [...this.ordenes]; 
                  this.aplicarFiltros();
              },
              (error) => {
                  // Manejo de errores en caso de que falle la cancelación
                  this.messageService.add({ 
                      severity: 'error', 
                      summary: 'Error', 
                      detail: 'Hubo un problema al cancelar el presupuesto. Por favor, intente nuevamente.' 
                  });
              }
            
          );
      }
    });
    this.aplicarFiltros(); // Aplicar filtros después de cancelar
 
  }

}
