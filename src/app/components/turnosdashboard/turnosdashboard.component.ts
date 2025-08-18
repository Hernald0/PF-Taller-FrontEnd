import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { Turno } from 'src/app/models/turno.model';
import { TurnoService } from 'src/app/services/turno.service';


@Component({
  selector: 'app-turnosdashboard',
  templateUrl: './turnosdashboard.component.html',
  styleUrls: ['./turnosdashboard.component.css']
})
export class TurnosdashboardComponent implements OnInit {
  turnosForm: FormGroup;
  formModificarTurno: FormGroup;
  turnos: Turno[] = [];
  turnosFiltrados: any[] = [];
  mostrarModalModificar: boolean = false;
  turnoSeleccionado: any;
  listaHorarios: any[] = [];
  minDate: Date;

  constructor(private fb: FormBuilder,
              private turnoService: TurnoService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router
  ) {
    this.turnosForm = this.fb.group({
      id: [''],
      nombre: [''],
      patente: [''],
      fecha: [''],
      hora: [''],
      status: ['']
    });

    this.formModificarTurno = this.fb.group({
      fechaNueva: [''],
      horarioSeleccionado: ['']
    });

    this.minDate = new Date();
  }

  ngOnInit() {
    this.cargarTurnos();
    console.log(this.turnos); // Verificar si los turnos se cargan
    console.log(this.turnosFiltrados);

    // Suscribirse a los cambios en el formulario y aplicar filtros
    this.turnosForm.valueChanges.subscribe(() => {
      this.aplicarFiltros();
    });

    

  }

  recuperarHorarios(event: any){
    //let fechaSeleccionada = this.fechaForm.controls['fecha'].value;
    console.log('Fecha seleccionado recuperarHorarios', event);
    
    const fechaSeleccionada = this.formatDate(event);

    console.log('Selected date:', fechaSeleccionada);

    this.turnoService.getTurnosDisponibles(fechaSeleccionada).subscribe(
      
      res =>{  this.listaHorarios = res as unknown as string[]; console.log(res)}
    );

}

formatDate(date: Date): string {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

  cargarTurnos() {
    /* Datos dummy
    this.turnos = [
      { id: '123', nombre: 'Juan Perez', patente: 'ABC123', fecha: new Date(2024, 7, 10), hora: '10:00' },
      { id: '456', nombre: 'Ana Gomez', patente: 'DEF456', fecha: new Date(2024, 7, 11), hora: '11:00' }
    ];*/

    this.turnoService.getTurnosAll().subscribe( resp => {
      this.turnos = resp as Turno[]; 
      this.turnosFiltrados = [...this.turnos];
    });

     // Copia inicial de los turnos
  }

  /*
  aplicarFiltros() {
    const { id, nombre, patente, fecha, hora } = this.turnosForm.value;

     
        this.turnosFiltrados = this.turnos.filter(turno => {
          return (
            (!id || turno.id.toString().includes(id)) &&
            (!nombre || turno.cliente.persona.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
            (!patente || turno.vehiculo.patente.toLowerCase().includes(patente.toLowerCase())) &&
            (!fecha || turno.fecha.toLocaleDateString() === fecha.toLocaleDateString()) &&
            (!hora || turno.hora.toString().includes(hora))
          );
        });
   
  }*/

        aplicarFiltros(limpiar: boolean = false): void {
          if (limpiar) {
            this.turnosForm.reset(); // Limpia todos los campos del formulario
          }
          
          const { id, nombre, patente, fecha, hora } = this.turnosForm.value;
        
          this.turnosFiltrados = this.turnos.filter(turno => {
            const nombreCliente = turno.cliente && turno.cliente.persona ? turno.cliente.persona.nombre : null;
            const patenteVehiculo = turno.vehiculo ? turno.vehiculo.patente : null;
        
            return (
              (!id || turno.id.toString().includes(id)) &&
              (!nombre || (nombreCliente && nombreCliente.toLowerCase().includes(nombre.toLowerCase()))) &&
              (!patente || (patenteVehiculo && patenteVehiculo.toLowerCase().includes(patente.toLowerCase()))) &&
              (!fecha || new Date(turno.fecha).toLocaleDateString() === new Date(fecha).toLocaleDateString()) &&
              (!hora || turno.hora.toString().includes(hora))
            );
          });
        }


  nuevo() {
    // Lógica para crear un nuevo turno
  }

  consultar(turno: Turno) {
   console.log(turno);
   this.router.navigate(['/recepcionvehiculo', turno.id], { queryParams: { modo: 'ver' } });
   }

  modificar(turno) {
     
     this.turnoSeleccionado = { ...turno };
 
     this.formModificarTurno.get('fechaNueva').setValue(new Date(turno.fecha));
   
     this.turnoService.getTurnosDisponibles(turno.fecha).subscribe(
      
        res =>{  this.listaHorarios = res as unknown as string[]; 
                console.log(res)
              }
    
    );
     
    this.mostrarModalModificar = true;
  }

  guardar() {

    
    // Actualiza el turno con la nueva fecha
    this.turnoSeleccionado.fecha =  this.formModificarTurno.value.fechaNueva;
    this.turnoSeleccionado.hora = this.formModificarTurno.value.horarioSeleccionado.hora;
    console.log( this.turnoSeleccionado);
    this.turnoService.modificarTurno( this.turnoSeleccionado).subscribe(    (response) => {
          // Aquí puedes verificar si el backend devuelve algún tipo de respuesta
          // Si la respuesta es exitosa, muestra el mensaje de éxito
          this.messageService.add({ 
              severity: 'success', 
              summary: 'Turno Modificado', 
              detail: 'Se modificó correctamente el turno de ' +this.turnoSeleccionado.cliente.persona.nombre + ' - ' + this.turnoSeleccionado.vehiculo.patente + '.' 
          });
          
          const index = this.turnos.findIndex(t => t.id === this.turnoSeleccionado.id);
          if (index !== -1) {
              // Actualizar los valores de `fecha` y `hora`
              this.turnos[index].fecha = this.turnoSeleccionado.fecha;
              this.turnos[index].hora = this.turnoSeleccionado.hora;
              this.turnos[index].status = 'reservado';  // Actualiza el status si es necesario
          }

          this.turnos = [...this.turnos]; 
          this.aplicarFiltros();
      },
      (error) => {
          // Manejo de errores en caso de que falle la cancelación
          this.messageService.add({ 
              severity: 'error', 
              summary: 'Error', 
              detail: 'Hubo un problema al modificar el turno. Por favor, intente nuevamente.' 
          });
      });

    this.mostrarModalModificar = false;
  // Aplicar filtros después de modificar
  }

  cancelar(turno) {
    // Cambia el estado del turno a cancelado
    turno.estado = 'Cancelado';
    this.confirmationService.confirm({
      message: '¿Desea cancelar el turno de: '+ turno.cliente.persona.nombre + ' - ' + turno.vehiculo.patente + '"?',
      accept: () => {
          this.turnoService.cancelarTurno(turno.id).subscribe(
            
                (response) => {
                  // Aquí puedes verificar si el backend devuelve algún tipo de respuesta
                  // Si la respuesta es exitosa, muestra el mensaje de éxito
                  this.messageService.add({ 
                      severity: 'success', 
                      summary: 'Turno cancelado', 
                      detail: 'Se canceló correctamente el turno de ' + turno.cliente.persona.nombre + ' - ' + turno.vehiculo.patente + '.' 
                  });
                  
                  // Actualiza el estado del turno a 'Cancelado'
                  turno.status = 'cancelado';
                  
           
                  this.turnos = [...this.turnos]; 
                  this.aplicarFiltros();
              },
              (error) => {
                  // Manejo de errores en caso de que falle la cancelación
                  this.messageService.add({ 
                      severity: 'error', 
                      summary: 'Error', 
                      detail: 'Hubo un problema al cancelar el turno. Por favor, intente nuevamente.' 
                  });
              }
            
          );
      }
    });
    this.aplicarFiltros(); // Aplicar filtros después de cancelar
  }
}