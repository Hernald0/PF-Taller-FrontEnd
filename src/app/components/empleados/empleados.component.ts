import { Component, OnInit } from '@angular/core';
  import { FormGroup, Validators,FormBuilder, FormControl } from '@angular/forms';
  import { ConfirmationService, MessageService } from 'primeng/api';
  
  //----------------------
  import { EstadoCivil } from 'src/app/models/EstadoCivil.model';
  import { Genero } from 'src/app/models/genero.model';
  import { Localidad } from 'src/app/models/localidad.model';
  import { Empleado } from 'src/app/models/empleado.model';
  import { Provincia } from 'src/app/models/provincia.model';
  import { TipoIdentificador } from 'src/app/models/tipoidentificador.model';
  //----------------------
  import { EstadoCivilService } from 'src/app/services/estadocivil.service';
  import { GenerosService } from 'src/app/services/generos.service';
  import { LocalidadService } from 'src/app/services/localidad.service';
  import { TallerService } from 'src/app/services/taller.service';
  import { TipoIdentificadorService } from 'src/app/services/tipoidentificador.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: []
})
export class EmpleadosComponent implements OnInit {
  
    listaEmpleados: Empleado[];
    listaGeneros: Genero[];
  
    listaLocalidades: Localidad[];
    listaTipoIdentificadores: TipoIdentificador[];
    listaEstadoCivil: EstadoCivil[];
    displayDialog: boolean = false;
    formularioEmpleado: FormGroup;
    empleadoId: number;
    hasError: boolean;  
    contador: number;
    editable:boolean;
    tituloHeader: string;
    accion: string;
    
   
  
    constructor(public service:TallerService,
                public serviceGenero:GenerosService,
                public serviceTipoIdentificador:TipoIdentificadorService,
                public serviceEstadoCivil: EstadoCivilService,
                public serviceLocalidad: LocalidadService,
                public formBuilder: FormBuilder,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) { }
  
    ngOnInit() :void {
      
      this.getListadoLlenarGrilla();
       
                                                  
      this.formularioEmpleado = this.formBuilder.group({
                                                     id:  new FormControl(0),
                                                     nombre: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                     apellido:new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                     direccion: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                     nroDireccion:new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                     genero:new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                     localidad:new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
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
                                                     estadoCivil :new FormControl(null)
                                                    })                                                  
      
    }
  
    openDialog(empleado? : Empleado, 
               accion? : string ):void{
      
        this.displayDialog = true;
        this.hasError = false;
        this.empleadoId = empleado ? empleado.id : null;
        this.accion = accion;
        
        switch(accion) {
          case "nuevo": 
              this.tituloHeader = "Nueva Empleado";
              this.formularioEmpleado.enable();
              break;
          case "consulta": 
              this.tituloHeader = "Consulta Empleado"
              this.formularioEmpleado.disable();
              break;
          case "edicion": 
              this.tituloHeader = "Editar Empleado";
              this.formularioEmpleado.enable();
              break;
          default:
              this.tituloHeader = ""
              break;
        }
  
  
        this.formularioEmpleado.controls["id"].setValue( empleado ? empleado.id : 0 );
        this.formularioEmpleado.controls["nombre"].setValue( empleado ? empleado.persona.nombre : null );
        this.formularioEmpleado.controls["apellido"].setValue( empleado ? empleado.persona.apellido : null );
        this.formularioEmpleado.controls["direccion"].setValue( empleado ? empleado.persona.direccion : null );
        this.formularioEmpleado.controls["nroDireccion"].setValue( empleado ? empleado.persona.nroDireccion : null );      
        this.formularioEmpleado.controls["genero"].setValue( empleado ? empleado.persona.genero : null );
        this.formularioEmpleado.controls["localidad"].setValue( empleado ? empleado.persona.localidad : null );      
        this.formularioEmpleado.controls["fecNacimiento"].setValue( empleado ? new Date(empleado.persona.fecNacimiento)  : null );                                                                                     
        this.formularioEmpleado.controls["dpto"].setValue( empleado ? empleado.persona.dpto : null );                                              
        this.formularioEmpleado.controls["piso"].setValue( empleado ? empleado.persona.piso : null );                                          
        this.formularioEmpleado.controls["telcelular"].setValue( empleado ? empleado.persona.telcelular : null );
        this.formularioEmpleado.controls["telfijo"].setValue( empleado ? empleado.persona.telfijo : null );
        this.formularioEmpleado.controls["tipoIdentificador"].setValue( empleado ? empleado.persona.tipoIdentificador : null );
        this.formularioEmpleado.controls["nroIdentificacion"].setValue( empleado ? empleado.persona.nroIdentificacion : null );
        this.formularioEmpleado.controls["razonSocial"].setValue( empleado ? empleado.persona.razonSocial : null );
        this.formularioEmpleado.controls["tipoEmpleado"].setValue( empleado ? empleado.persona.tipoPersona : "F" );                                              
        this.formularioEmpleado.controls["email"].setValue( empleado ? empleado.persona.email : null );
        this.formularioEmpleado.controls["ocupacion"].setValue( empleado ? empleado.persona.ocupacion : null );
        this.formularioEmpleado.controls["estadoCivil"].setValue( empleado ? empleado.persona.estadoCivil : null );
     
  
    };
  
    deleteEmpleado(empleado  : Empleado):void{
      this.confirmationService.confirm({
        message: 'Desea eliminar a "Id: '+ empleado.id + ' - ' + empleado.persona.apellido + ', '+ empleado.persona.nombre + '"?',
        accept: () => {
            this.service.deleteEmpleado(empleado.id).subscribe(
              
              () => {
                this.listaEmpleados = this.listaEmpleados.filter(x => x.id != empleado.id);
                this.messageService.add({severity:'success', detail:'Se eliminó correctamente la Empleado "Id: '+ empleado.id + ' - ' + empleado.persona.apellido + ', '+ empleado.persona.nombre + '" eliminada.'});
              }
              
            );
        }
    });
    }
  
     getListadoLlenarGrilla(): void {
     
      this.service.getEmpleados().subscribe(res => {     
    
        this.listaEmpleados = res as Empleado[];       
        
       }); 
  
       this.serviceGenero.getGeneros().subscribe(res => {     
        this.listaGeneros = res as Genero[];            
       });  
  
       this.serviceTipoIdentificador.getTipoIdentificadors().subscribe(res => {     
        this.listaTipoIdentificadores = res as TipoIdentificador[];            
       }); 
       
       this.serviceEstadoCivil.getEstadoCivils().subscribe(res => {     
        this.listaEstadoCivil = res as EstadoCivil[];            
       }); 
       
    }
  
    get nombre() {
      return this.formularioEmpleado.get('nombre');
    }
  
    saveEmpleado(empleado  : Empleado):void{

      let payload: Empleado = {
        ...this.formularioEmpleado.value
      };
  
      console.log('saveEmpleado Payload: ');
      console.log(payload);
      
      if(!this.empleadoId){
                             
         this.service.postEmpleado(payload).subscribe(
          res => { 
                    this.messageService.add({severity:'success', detail:'Se agregó correctamente la Empleado "'+payload.persona.nombre+'" agregado'});
                    console.log('Respuesta POST: ' + res);
                  }, 
                  err => { console.log( err);
                           this.hasError = true; 
                  }
          );
  
          
  
      }else{
        console.log(payload);
        this.service.putEmpleado(payload).subscribe(
          res => { 
                    this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Empleado "'+payload.persona.nombre+'" agregado'});
                    
                  }, 
                  err => { console.log( 'Error en actualización: '); 
                           console.log(err);
                          }
        );
  
      };
      
      this.displayDialog = false;
      
      this.ngOnInit();
      
    }
  
    // Agrego la siguiente función
    filterCountry(event){
      console.log('event',event);
    
    console.log('contador: '+this.contador)
    
          this.serviceLocalidad.getLocalidades(event.query).subscribe(
             res => {     
                this.listaLocalidades = res as Localidad[]; 
                console.log(res);
              }, 
              err => { console.log( err);
                      
              }     
      );
 
  
   }
  
  }
  
  
  