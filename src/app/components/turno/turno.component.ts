import { EventService } from '../../services/event.service';
import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

import { Event } from '../../models/event.model';
import Tooltip from 'tooltip.js'
import { FullCalendar } from 'primeng/components/fullcalendar/fullcalendar';

import * as $ from 'jquery';
import { Cliente } from 'src/app/models/cliente.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Turno } from 'src/app/models/turno.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { MarcamodeloService } from 'src/app/services/marcamodelo.service';
import { TipoIdentificadorService } from 'src/app/services/tipoidentificador.service';

import { TipoIdentificador } from 'src/app/models/tipoidentificador.model';
import { Observable, Subject } from 'rxjs';
import { Marca } from 'src/app/models/marca.model';
import { Modelovehiculo } from 'src/app/models/modelovehiculo.model';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TurnoService } from 'src/app/services/turno.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioEstadoStepperTurnoService } from 'src/app/services/servicio-estado-stepper-turno.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';

@Component({
  selector: 'turnos',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TurnoComponent implements OnInit {

  /*Variables para los stepers*/
  stepForm: FormGroup;
  clienteForm: FormGroup;
  motivoForm: FormGroup;
  serviciosForm: FormGroup;
  fechaForm: FormGroup;
  vehiculoForm: FormGroup;

  activeIndex: number = 0;
  calendarOptions: any;
  modelos: any[] = [];
  marcaSeleccionada: Marca;
  marcas: Marca[];
  modelosDeMarcaSeleccionada: Modelovehiculo[];
  dummyClientes: Cliente[] = [];
  dummyServicios: any[] = [];

  displayDialog: boolean = false;
  selectedCliente: Cliente | null = null;
  vehiculoElegido: Vehiculo | null = null;
  listaTipoIdentificadores: TipoIdentificador[];
  listaServicios : Servicio[];
  serviciosSeleccionados : Servicio[] = [];
  listaHorarios: any[] = [];

  areFieldsFilled: boolean = false;
  habilitado: boolean = false;

  fechasOcupadas = [
    new Date('2024-06-21T08:00:00'),
    new Date('2024-06-21T16:00:00')
  ];

  fechaSeleccionada: Date | null = null;
  //selectedServices: number[] = [];

  clienteTurno: Cliente = null;
 
  private unsubscribe$ = new Subject<void>();
 
  /*Variables para el calendar*/ 
  public events: Event[];
  public optionsMonth: any;
  public optionsList: any;
  public fechaEventosList: Date;
  EstadoConfirmado: boolean = false;
  ClienteExiste: boolean = false;
  clienteFormValido: boolean;
  mostrar: boolean = false;
  labelAuto: string = "Nuevo Vehículo";
  patenteValida: boolean = true;
  patenteExistente: boolean = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private turnoService: TurnoService,
    private serviciosService: ServiciosService,
    private clienteService: ClientesService,
    public marcamodeloService: MarcamodeloService,
    public serviceTipoIdentificador:TipoIdentificadorService,
    private cdr: ChangeDetectorRef,
    private stateService: ServicioEstadoStepperTurnoService,
    private messageService: MessageService,
    private router: Router,
    private location: Location
  ) {


    /*
    this.fechaEventosList = new Date();

    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });

    this.optionsMonth = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: esLocale,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth, dayGridWeek, dayGridDay'
      },
      eventRender: (e) =>  {
        var tooltip = new Tooltip(e.el, {
          title: "<h6>"+e.event.title +"</h6>"+e.event.extendedProps.description,
          placement: 'top',
          trigger: 'hover',
          container: 'body',
          html: true
        });

      },
      editable: false
    };
  
    this.optionsList = {
      plugins: [dayGridPlugin, listPlugin, interactionPlugin],
      defaultDate: new Date(),
      duration: { days: 10 },
      defaultView: 'list',
      locale: esLocale,
      header: {
        left: '',
        center: 'title',
        right: ''
      },
      editable: false
    };


  
      this.fechaEventosList = new Date();
    
      this.eventService.getEvents().subscribe(events => {
        this.events = events;
      });
  
      this.optionsMonth = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: new Date(),
        locale: esLocale,
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth, dayGridWeek, dayGridDay'
        },
        eventRender: (e) =>  {
          var tooltip = new Tooltip(e.el, {
            title: "<h6>"+e.event.title +"</h6>"+e.event.extendedProps.description,
            placement: 'top',
            trigger: 'hover',
            container: 'body',
            html: true
          });
  
        },
        editable: false
      };
  
      this.optionsList = {
        plugins: [dayGridPlugin, listPlugin, interactionPlugin],
        defaultDate: new Date(),
        duration: { days: 10 },
        defaultView: 'list',
        locale: esLocale,
        header: {
          left: '',
          center: 'title',
          right: ''
        },
        editable: false
      };*/
       
    

      this.serviceTipoIdentificador.getTipoIdentificadors().subscribe(res => {     
        this.listaTipoIdentificadores = res as TipoIdentificador[];            
       }); 

      this.serviciosService.getServicios().subscribe(res => {
        console.log('ejecuta get de servicios', res);
        this.listaServicios = res as Servicio[];
        this.addCheckboxes();
      });

      

      // Suscribirse a los observables del servicio para mantener el estado
      this.stateService.cliente$.subscribe(cliente => {
      if (cliente) {
        this.clienteForm.patchValue(cliente);
      }
  });

  this.stateService.vehiculo$.subscribe(vehiculo => {
    if (vehiculo) {
      this.vehiculoForm.patchValue(vehiculo);
    }
  });

  this.stateService.motivo$.subscribe(motivo => {
    if (motivo) {
      this.motivoForm.patchValue(motivo);
    }
  });

  this.stateService.servicios$.subscribe(servicios => {
    if (servicios.length > 0) {
      const selectedServices = this.serviciosForm.controls['selectedServices'] as FormArray;
      servicios.forEach(servicio => {
        selectedServices.push(this.fb.control(servicio));
      });
    }
  });

  this.stateService.fecha$.subscribe(fecha => {
    if (fecha) {
      this.fechaForm.patchValue(fecha);
    }
  });

  }


  ngOnInit() {
    this.stepForm = this.fb.group({
        step: [0]
    });

    this.clienteForm = this.fb.group({
        id: [''],
        tipoPersona: ['F', Validators.required],
        tipoIdentificador: ['', [Validators.required]],
        nroIdentificacion: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
        nombre: [''],
        apellido: [''],
        razonsocial: [''],
        telefono: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      
    });

    this.clienteForm.valueChanges.subscribe(() => {
      this.updateNextButtonState();
    }); 


    this.vehiculoForm = this.fb.group({
        selectedVehiculo: [''],
        vehiculo: this.fb.group({
            id: [null],
            patente: ['', Validators.required],
            marcavehiculo: [null, Validators.required],
            modelovehiculo: [null, Validators.required],
        })
    });

    this.motivoForm = this.fb.group({
        motivoConsulta: ['', [Validators.required, Validators.maxLength(3000)]]
    });

    this.serviciosForm = this.fb.group({
        selectedServices: this.fb.array([]),
       
    });

    this.fechaForm = this.fb.group({
        fecha: ['', Validators.required],
        horarioSeleccionado : ['', Validators.required],
    });


    this.stepForm.valueChanges.subscribe(() => {
      this.guardarValoresActuales();
     });

   
    
    /* sección de Calendar
    this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        dateClick: this.handleDateClick.bind(this),
        events: [
            { title: 'Ocupado', start: '2024-06-21', color: 'red' }
        ]
    };*/

    // Detectar cambios en la marca seleccionada y actualizar los modelos
    this.marcamodeloService.getMarcas().subscribe(res => {
      this.marcas = res as Marca[];
      const marcaControl = this.vehiculoForm.get('vehiculo.marcavehiculo'); // Obtener el control correctamente
       if (marcaControl) {
          marcaControl.setValue(this.marcas); // Establecer el valor solo si el control no es nulo
      } 
  });  
   
    //Detectar cambios en la marca seleccionada y actualizar los modelos
    this.vehiculoForm.get('vehiculo.marcavehiculo').valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(marcaSeleccionada => { 
      console.log('marcaSeleccionada', marcaSeleccionada[0]);
      this.actualizarModelos(marcaSeleccionada[0]);
   
    });
}

goBack() {
  this.location.back();
}

updateNextButtonState() {
  const tipoPersona = this.clienteForm.get('tipoPersona').value;
  /*
  console.log('updateNextButtonState: ',this.clienteForm.get('tipoPersona').value &&
   this.clienteForm.get('nroIdentificacion').value &&
   this.clienteForm.get('nombre').value  &&
   this.clienteForm.get('apellido').value &&
   this.clienteForm.get('telefono').value &&
   this.clienteForm.get('email').value );*/

  if (tipoPersona === 'F') {
    this.clienteFormValido = this.clienteForm.get('tipoPersona') && this.clienteForm.get('tipoPersona').value &&
    this.clienteForm.get('tipoIdentificador') && this.clienteForm.get('tipoIdentificador').value &&
    this.clienteForm.get('nroIdentificacion') && this.clienteForm.get('nroIdentificacion').value &&
    this.clienteForm.get('nombre') && this.clienteForm.get('nombre').value &&
    this.clienteForm.get('apellido') && this.clienteForm.get('apellido').value &&
    this.clienteForm.get('telefono') && this.clienteForm.get('telefono').value &&
    this.clienteForm.get('email') && this.clienteForm.get('email').value;
} else {
  this.clienteFormValido = this.clienteForm.get('tipoPersona') && this.clienteForm.get('tipoPersona').value &&
    this.clienteForm.get('tipoIdentificador') && this.clienteForm.get('tipoIdentificador').value &&
    this.clienteForm.get('nroIdentificacion') && this.clienteForm.get('nroIdentificacion').value &&
    this.clienteForm.get('razonsocial') && this.clienteForm.get('razonsocial').value &&
    this.clienteForm.get('telefono') && this.clienteForm.get('telefono').value &&
    this.clienteForm.get('email') && this.clienteForm.get('email').value;
  }

 

}



addCheckboxes() {
  this.listaServicios.forEach((servicio, index) => {
    const control = new FormControl(false); // Añadimos un control por cada servicio, inicializado en false
    (this.serviciosForm.controls.selectedServices as FormArray).push(control);
  });
}

get selectedServices() {
  return this.serviciosForm.get('selectedServices') as FormArray;
}

guardarValoresActuales() {
  const selectedServices = this.serviciosForm.controls['selectedServices'] as FormArray;
  console.log('Guardando valores actuales:', selectedServices.value);
}

guardarEstado() {
  this.stateService.setCliente(this.clienteForm.value);
  this.stateService.setVehiculo(this.vehiculoForm.value);
  this.stateService.setMotivo(this.motivoForm.value);
  this.stateService.setFecha(this.fechaForm.value);
 
}

checkFields() {
  console.log('entra en checkFields');
  const tipoIdentificadorControl = this.clienteForm.get('tipoIdentificador');
  const nroIdentificacionControl = this.clienteForm.get('nroIdentificacion');

  if (tipoIdentificadorControl && nroIdentificacionControl) {
    this.areFieldsFilled = !!tipoIdentificadorControl.value && !!nroIdentificacionControl.value;
  } else {
    this.areFieldsFilled = false;
  }
}

onClickTipoPersona() {

  if (this.clienteForm.controls['tipoPersona'].value === 'J') {
    this.clienteForm.controls['nombre'].setValue('');
    this.clienteForm.controls['apellido'].setValue('');
  }else
  {
    this.clienteForm.controls['razonsocial'].setValue('');
  }

  this.cdr.detectChanges();
}

seleccionarVehiculo(vehiculo: any){

    if (vehiculo){
    this.vehiculoForm.get('vehiculo.id').setValue(vehiculo.id);
    this.vehiculoForm.get('vehiculo.patente').setValue(vehiculo.patente);
    this.vehiculoForm.get('vehiculo.marcavehiculo').setValue(vehiculo.modelovehiculo.marcavehiculo);
    this.vehiculoForm.get('vehiculo.modelovehiculo').setValue(vehiculo.modelovehiculo);
    this.patenteValida = true;
   } else
   {  
    this.patenteValida = false;
      if (this.mostrar) {
        this.mostrar = false;
        this.labelAuto = 'Auto Nuevo';
        this.vehiculoForm.get('vehiculo').setValue('');
        this.vehiculoForm.get('selectedVehiculo').setValue('');
        this.vehiculoForm.patchValue({
          id: this.clienteTurno.id,
          nombre:  this.clienteTurno.persona.nombre,
          apellido:  this.clienteTurno.persona.apellido,
          email:  this.clienteTurno.persona.email,
          telefono: this.clienteTurno.persona.telcelular
        });
        
      }else
      {
        this.mostrar = true;
        this.labelAuto = 'Deshacer';
        this.vehiculoForm.get('vehiculo.patente').setValue('');
        this.vehiculoForm.get('selectedVehiculo').setValue('');
      }
    
    

   }

}

onCheckboxChange(e: any, servicio: Servicio) {
  
  const selectedServices = this.serviciosForm.controls['selectedServices'] as FormArray;
  console.log('antes selectedServices: ', selectedServices);
  const checkbox = e.target as HTMLInputElement;
  
  if (checkbox.checked) {
    console.log('entra por tildar');
    selectedServices.push(new FormControl(servicio.id));
    this.serviciosSeleccionados.push(servicio);
  } else {
    console.log('entra por destildar');
    const index = selectedServices.controls.findIndex(x => x.value === servicio.id);
    selectedServices.removeAt(index);
    const index2 = this.serviciosSeleccionados.findIndex(x => x.id === servicio.id);
    this.serviciosSeleccionados.splice(index2, 1);
  }

  console.log('hay en serviciosSeleccionados: ', this.serviciosSeleccionados);

  

}

/*
onCheckboxChange(event : any, servicio : any) {
  const selectedServicesArray = this.serviciosForm.get('serviciosSeleccionados').value;
  const index = selectedServicesArray.findIndex(s => s.id === servicio.id);

  if (event.checked) {
    if (index === -1) {
      selectedServicesArray.push(servicio);
    }
  } else {
    if (index !== -1) {
      selectedServicesArray.splice(index, 1);
    }
  }
}*/

 /*
onCheckboxChange(event: any, servicio: any) {
  const selectedServices = this.serviciosForm.controls['selectedServices'] as FormArray;
  console.log('selectedServices: ', selectedServices);
  if (event) {
    selectedServices.push(this.fb.control(servicio));
  } else {
    const index = selectedServices.controls.findIndex(x => x.value.id === servicio.id);
    if (index > -1) {
      selectedServices.removeAt(index);
    }
  }

  // Opcional: Log para verificar
  console.log('Servicios Seleccionados:', this.serviciosForm.value.selectedServices);
} */

actualizarModelos(marcaSeleccionada: Marca)  { // Agregar Observable<void> como tipo de retorno
    
     console.log('ingresa en actualizarModelos ', marcaSeleccionada);
    
     let marcaControl = this.vehiculoForm.get('vehiculo.marcavehiculo').value; 
     
     console.log('muestra el valor del combo ', marcaControl);
    
     
     marcaSeleccionada = marcaSeleccionada ? marcaSeleccionada : marcaControl;

     if (marcaSeleccionada) {
      console.log('Ingresa a la función', marcaSeleccionada);
      this.marcamodeloService.getModelos(marcaSeleccionada.id).subscribe(
        //this.marcamodeloService.getMarca(marcaSeleccionada.id).subscribe(
             Marca => {
                this.modelosDeMarcaSeleccionada = Marca.modelovehiculos;
                console.log('Modelos recuperados', this.modelosDeMarcaSeleccionada);

                // Asignar el primer modelo de la lista si está disponible
                if (this.modelosDeMarcaSeleccionada.length > 0) {
                    const modeloDefault = this.modelosDeMarcaSeleccionada[0] as Modelovehiculo;
                    console.log('setea el modelo con el primer objeto', modeloDefault);
                    this.vehiculoForm.get('vehiculo.modelovehiculo').setValue(modeloDefault);
                    console.log('Valor de modelovehiculo 1',  this.vehiculoForm.get('vehiculo.modelovehiculo').value ) ;
                } else {
                    this.vehiculoForm.get('vehiculo.modelovehiculo').setValue(null);
                }

                // Detectar cambios después de actualizar los modelos
                this.cdr.detectChanges();
                console.log('Valor de modelovehiculo 2',  this.vehiculoForm.get('vehiculo.modelovehiculo').value ) ;
                //observer.next(); // Emitir un valor para completar la suscripción
                console.log('Valor de modelovehiculo 3',  this.vehiculoForm.get('vehiculo.modelovehiculo').value ) ;
                //observer.complete(); // Completar la suscripción
                console.log('Valor de modelovehiculo 4',  this.vehiculoForm.get('vehiculo.modelovehiculo').value ) ;
            },
            error => {
                console.error('Error al obtener la marca:', error);
                this.modelosDeMarcaSeleccionada = [];
                //observer.error(error); // Propagar el error a la suscripción
            }
            
        );console.log('Valor de modelovehiculo',  this.vehiculoForm.get('vehiculo.modelovehiculo').value );
    } else {
        this.modelosDeMarcaSeleccionada = [];
       
    }
    
    }
 
 

  onBlurNroIdentificacion() {
    console.log('onBlurNroIdentificacion',this.areFieldsFilled)

    if (this.areFieldsFilled)
      //if (!(nroIdentificacion === null || nroIdentificacion === undefined || nroIdentificacion.trim().length === 0)) {
        //console.log('valor',nroIdentificacion);
        this.buscarCliente();
      //}

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

  handleDateClick(arg: any) {
    const selectedDate = new Date(arg.dateStr);
    const isDateOccupied = this.fechasOcupadas.some(fecha => fecha.toDateString() === selectedDate.toDateString());

    if (isDateOccupied) {
      alert('Esta fecha ya está ocupada.');
    } else {
      this.fechaSeleccionada = selectedDate;
      this.fechaForm.patchValue({ fecha: selectedDate });
      alert('Fecha seleccionada: ' + arg.dateStr);
    }
  }

  onMarcaChange(marca: string) {
    if (marca) {
      this.modelos = [
        { label: 'Seleccione Modelo', value: null },
        { label: marca + ' Modelo 1', value: marca + ' Modelo 1' },
        { label: marca + ' Modelo 2', value: marca + ' Modelo 2' }
      ];
      this.clienteForm.get('vehiculo.modelo').enable();
    } else {
      this.modelos = [];
      this.clienteForm.get('vehiculo.modelo').disable();
    }
  }

  buscarCliente() {
    const nroIdentificacion = this.clienteForm.get('nroIdentificacion').value;
    const tipoIdentificacion = this.clienteForm.get('tipoIdentificador').value;

    this.clienteService.getClienteByIdentificador( tipoIdentificacion.id, nroIdentificacion).pipe(
    ).subscribe(
      res => { 
        this.clienteTurno = res as Cliente;
        console.log('recupera cliente en buscarCliente :', this.clienteTurno);
        
        if (this.clienteTurno) {
       
          this.clienteForm.patchValue({
            id: this.clienteTurno.id,
            nombre:  this.clienteTurno.persona.nombre,
            apellido:  this.clienteTurno.persona.apellido,
            email:  this.clienteTurno.persona.email,
            telefono: this.clienteTurno.persona.telcelular
          });

          this.clienteForm.patchValue({
            vehiculo: {
              id: this.clienteTurno.vehiculos[0].id,
              patente:  this.clienteTurno.vehiculos[0].patente,
              marcavehiculo: this.clienteTurno.vehiculos[0].modelovehiculo.marcavehiculo,
              modelovehiculo: this.clienteTurno.vehiculos[0].modelovehiculo
            }
          });
          this.ClienteExiste = true;

        } else { 
          this.clienteForm.patchValue({
            id: null,
            nombre:  null,
            apellido:  null,
            email:  null,
            telefono: null
          });

          this.clienteForm.patchValue({
            vehiculo: {
            
          
            }
          });

          this.ClienteExiste = false;

          alert('No se encontraron coincidencias.');
        }
      }
    );

  
  }

  validarPatente()
  {
    const patente = this.vehiculoForm.get('vehiculo.patente').value;
  
    if (patente)
    { console.log('entra por patente');
      
      if (this.clienteTurno && this.clienteTurno.vehiculos.length> 0)
      {   
          console.log('entra porque el cliente existe');
          const index = this.clienteTurno.vehiculos.findIndex(x => x.patente === patente );
          console.log('muestra el index', index);

          if (index > 0) 
            { console.log('existe la patente');  
              this.patenteValida = false;
              this.patenteExistente = true;
            }
          else
            {
              this.patenteValida = true;
              this.patenteExistente = false;
            }
           
      }else
      {
        //cuando no existe el cliente
        this.patenteValida = true;
        this.patenteExistente = false;
      }

    } else
      {  console.log('sin patente');
        this.patenteValida = false;
        this.patenteExistente = false;
      };
    
     return this.patenteExistente;

  };


 
 
 
 
  

 

  onClienteSelect(cliente: Cliente) {
    this.selectedCliente = cliente;
    this.clienteForm.patchValue({
      id: cliente.id,
      nombre: cliente.persona.nombre,
      apellido: cliente.persona.apellido,
      vehiculo: {
        id: cliente.vehiculos[0].id,
        patente: cliente.vehiculos[0].patente,
        marca: cliente.vehiculos[0].modelovehiculo.marcavehiculo.modelovehiculos,
        modelo: cliente.vehiculos[0].modelovehiculo
      }
    });
    this.displayDialog = false;
  }

  siguienteStep() {
    this.activeIndex++;
    this.guardarValoresActuales();
  }

  anteriorStep() {
    this.activeIndex--;
    this.guardarValoresActuales();
  }

  marcarValoresActuales(){
    const selectedServices = this.serviciosForm.controls['selectedServices'].value;
    
    for (let servicio in selectedServices){
      this.serviciosForm.controls['selectedServices'].value
    }
    
  }

  confirmarTurno() {
    if (this.stepForm.valid) {
    // Construir el payload con la información de todos los pasos
    const payload = {
      cliente:  {
        id: this.clienteForm.get('id').value,
        persona: {
          tipoIdentificador: this.clienteForm.get('tipoIdentificador').value,
          nroIdentificacion: this.clienteForm.get('nroIdentificacion').value,
          tipoPersona: this.clienteForm.get('tipoPersona').value,
          razonsocial: this.clienteForm.get('razonsocial').value,
          nombre: this.clienteForm.get('nombre').value,
          apellido: this.clienteForm.get('apellido').value,
          telefono: this.clienteForm.get('telefono').value,
          email: this.clienteForm.get('email').value
        },
      vehiculos: [  {
        id: this.vehiculoForm.get('vehiculo.id').value,
        patente: this.vehiculoForm.get('vehiculo.patente').value,
        marcavehiculo: this.vehiculoForm.get('vehiculo.marcavehiculo').value,
        modelovehiculo: this.vehiculoForm.get('vehiculo.modelovehiculo').value
      }]
      },
     
      motivoConsulta: this.motivoForm.get('motivoConsulta').value,
      servicios: this.serviciosSeleccionados,
      fecha:  this.fechaForm.get('fecha').value,
      hora: this.fechaForm.get('horarioSeleccionado').value.hora
      
      
    };

    console.log('payload',payload);
    this.turnoService.postTurno(payload).subscribe( 
      res => { 
        const clienteNombreORazonSocial = payload.cliente.persona.nombre || payload.cliente.persona.razonsocial;

        this.messageService.add({severity:'success', 
                                 detail:'Queda confirmado el Turno para el Cliente: "'+ clienteNombreORazonSocial +'" '});
        //console.log('Respuesta POST: ' + res);
        this.EstadoConfirmado = true;
       
      }, 
      err => { console.log( err);
               //this.hasError = true; 
      }
     );
    } 


  }

  navigateToNewTurno(){
     
    this.EstadoConfirmado = false;
    this.clienteForm.reset();
    this.clienteForm.controls['tipoPersona'].setValue('F');
    this.vehiculoForm.reset();
    this.motivoForm.reset();
    this.serviciosForm.reset();
    this.fechaForm.reset();
    this.activeIndex = 0;
  }
}
