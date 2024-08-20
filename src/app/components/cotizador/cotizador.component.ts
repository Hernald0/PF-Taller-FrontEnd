import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../components/servicios/pop-up.service';
import { PopUpDatosService } from '../servicios/pop-up-datos.service';
import { Cliente } from 'src/app/models/cliente.model';
import { Empleado } from 'src/app/models/empleado.model';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {

  mostrarPopup: boolean = false;
  datos: any;
  cliente: Cliente;
  empleado: Empleado;
  itemSeleccionadoClase: string;
  formularioCotizacion: FormGroup;
 
  
  //columnas: { nombre: string, tipo: string }[] = [
    // Define las columnas según tus necesidades
  //];

  constructor(private popupService: PopupService,
              private datosService: PopUpDatosService,
              private globalService: GlobalService,
              public  formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) 
  { }

  ngOnInit(): void {
        //Inicializar y vincular cada grupo 
        this.formularioCotizacion = this.formBuilder.group({
                                                            idCotizacion:  new FormControl(0),
                                                            nombreEmpleado: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                            fechaCotizacion: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                            estadoCotizacion: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                            /* */
                                                            idCliente: new FormControl(null),
                                                            nombreCliente: new FormControl(null),
                                                            clienteDireccion: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                            clientenroDireccion:new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                            clienteTelefono: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                            clienteCelular: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                            localidad:new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                            patente: new FormControl(null),
                                                            marca: new FormControl(null),
                                                            modelo: new FormControl(null),
                                                            color: new FormControl(null),
                                                            anio: new FormControl(null),
                                                            numeroserie: new FormControl(null)

                                                            /*
                                                            fecNacimiento: new FormControl(null),                                                                                       
                                                            dpto : new FormControl(null),                                                  
                                                            piso : new FormControl(null),                                             
                                                            telcelular : new FormControl(null),
                                                            telfijo : new FormControl(null),
                                                            tipoIdentificador : new FormControl(null),
                                                            nroIdentificacion :  new FormControl(null),
                                                            razonSocial : new FormControl(null),
                                                            tipoEmpleado :  new FormControl('F'),                                              
                                                            email : new FormControl(null, Validators.compose([Validators.email])),
                                                            ocupacion :new FormControl(null),
                                                            estadoCivil :new FormControl(null)*/
                                                          });                                                  

  }

  abrirPopup(tipo: string, parametro?: string) {
    console.log('abrirPopup');
    this.mostrarPopup = true;
    this.datosService.cargarDatos(tipo, parametro).subscribe(
      (res) => {
        console.log('resultado abrirPopup', res);
        this.datos = res;
        this.popupService.mostrarPopup();
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
    
    
  }

  cerrarPopup() {
    
    this.popupService.cerarPopup();
  }

  setItemSeleccionadoClase(pClase: string){
      console.log('setItemSeleccionadoClase: ', pClase)
      this.itemSeleccionadoClase = pClase;
  };

  itemSeleccionadoDesdePopup(itemSeleccionado: any) {
    console.log('1 Item seleccionado en el componente llamador:', itemSeleccionado);
    
    if (itemSeleccionado.item && itemSeleccionado.clase) {
      
      this.globalService.instanciarClasePorNombre(itemSeleccionado.clase, itemSeleccionado.item.Id);

      this.globalService.instanciarClasePorNombreObservable().subscribe((datos: any) => {
        console.log('Datos obtenidos:', datos);

        if (itemSeleccionado.clase === 'Cliente') {
          this.formularioCotizacion.patchValue({
            idCliente: datos.id,
            nombreCliente: datos.persona.apellido + ', ' + datos.persona.nombre,
            clienteDireccion: [datos.persona.direccion, 
                               datos.persona.nroDireccion, 
                               datos.persona.dpto, 
                               datos.persona.piso, 
                               datos.persona.barrio, 
                               datos.persona.localidad].filter(val => val).join(' '),
            clientenroDireccion: datos.persona.nroDireccion,
            clienteTelefono: datos.persona.telfijo,
            clienteCelular:  datos.persona.telcelular
          });
        } else if (itemSeleccionado.clase === 'Empleado') {
          // Lógica similar para asignar datos de empleado
        }
        else if (itemSeleccionado.clase === 'Vehiculo') {
        /*  this.formularioCotizacion.patchValue({ 

            patente : datos.
            marca
            modelo
            color
            anio
            numeroserie
          
          });*/
        }
      });

      /*
      const instancia = this.globalService.instanciarClasePorNombre(itemSeleccionado.clase,  itemSeleccionado.item.Id);
      
      switch ( itemSeleccionado.clase ) {
        case 'Cliente':
          console.log('asignacion de valores en cotizacion', instancia);
        
          this.formularioCotizacion.patchValue({
          
           clienteDireccion: instancia.persona.direccion,
           clientenroDireccion: instancia.persona.nroDireccion
          
          });   
           

            break;
        case 'Empleado':
            // statement 2
            break;
       
     }
      */

    } else {
      console.log('2 Item seleccionado en el componente llamador:', this.itemSeleccionadoClase);
      console.error('No se proporcionó un dato válido.');
    }
    
    /*
    if (typeof item === 'object' && item !== null) {
      // Realizar comprobaciones de tipo según las clases conocidas
      if (item instanceof Cliente) {
        console.log('Es una instancia de Cliente:', item);
        // Casting a Cliente
        const clienteTemp: Cliente = item as Cliente;
        console.log('Es una instancia de Cliente:', clienteTemp);
 
            this.clientesService.getCliente(clienteTemp.id).subscribe(res => {     
              // console.log('recupera todas las clientes');
              // console.log(res); 
               this.cliente = res;       
               
              }); 
      } else if (item instanceof Modelovehiculo) {
        console.log('Es una instancia de Modelovehiculo:', item);
      } else if (item instanceof Empleado) {
        console.log('Es una instancia de Modelovehiculo:', item);
      } else {
        console.log('Es un objeto genérico:', item);
      }
      
    }*/
  
  }

   
  
}
