import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

//----------------------
import { EstadoCivil } from 'src/app/models/EstadoCivil.model';
import { Genero } from 'src/app/models/genero.model';
import { Localidad } from 'src/app/models/localidad.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Provincia } from 'src/app/models/provincia.model';
import { TipoIdentificador } from 'src/app/models/tipoidentificador.model';
//----------------------
import { EstadoCivilService } from 'src/app/services/estadocivil.service';
import { GenerosService } from 'src/app/services/generos.service';
import { LocalidadService } from 'src/app/services/localidad.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { TipoIdentificadorService } from 'src/app/services/tipoidentificador.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  listaClientes: Cliente[];
  listaGeneros: Genero[];
  //listaProvincias: Provincia[];
  listaLocalidades: Localidad[];
  listaTipoIdentificadores: TipoIdentificador[];
  listaEstadoCivil: EstadoCivil[];
  displayDialog: boolean = false;
  formularioCliente: FormGroup;
  clienteId: number;
  hasError: boolean;  
  contador: number;
  editable:boolean;
  tituloHeader: string;
  accion: string;
  
 

  constructor(public service:ClientesService,
              public serviceGenero:GenerosService,
              public serviceTipoIdentificador:TipoIdentificadorService,
              public serviceEstadoCivil: EstadoCivilService,
              public serviceLocalidad: LocalidadService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() :void {
    
    this.getListadoLlenarGrilla();
     
                                                
    this.formularioCliente = this.formBuilder.group({
                                                   id:  new FormControl(0),
                                                   nombre: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                   apellido:new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                   direccion: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                   nroDireccion:new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                   genero: new FormControl(null),// Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                   localidad:new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                   fecNacimiento: new FormControl(null),                                                                                       
                                                   dpto : new FormControl(null),                                                  
                                                   piso : new FormControl(null),                                             
                                                   telcelular : new FormControl(null),
                                                   telfijo : new FormControl(null),
                                                   tipoIdentificador : new FormControl(null),
                                                   nroIdentificacion :  new FormControl(null),
                                                   razonSocial : new FormControl(null),
                                                   tipoCliente :  new FormControl('F'),                                              
                                                   email : new FormControl(null, Validators.compose([Validators.email])),
                                                   ocupacion :new FormControl(null),
                                                   estadoCivil :new FormControl(null)
                                                  })                                                  
    
  }

  openDialog(cliente? : Cliente, 
             accion? : string ):void{
    
      this.displayDialog = true;
      this.hasError = false;
      this.clienteId = cliente ? cliente.id : null;
      this.accion = accion;
      
      switch(accion) {
        case "nuevo": 
            this.tituloHeader = "Nueva Cliente";
            this.formularioCliente.enable();
            break;
        case "consulta": 
            this.tituloHeader = "Consulta Cliente"
            this.formularioCliente.disable();
            break;
        case "edicion": 
            this.tituloHeader = "Editar Cliente";
            this.formularioCliente.enable();
            break;
        default:
            this.tituloHeader = ""
            break;
      }


      this.formularioCliente.controls["id"].setValue( cliente ? cliente.id : 0 );
      this.formularioCliente.controls["nombre"].setValue( cliente ? cliente.persona.nombre : null );
      this.formularioCliente.controls["apellido"].setValue( cliente ? cliente.persona.apellido : null );
      this.formularioCliente.controls["direccion"].setValue( cliente ? cliente.persona.direccion : null );
      this.formularioCliente.controls["nroDireccion"].setValue( cliente ? cliente.persona.nroDireccion : null );      
      this.formularioCliente.controls["genero"].setValue( cliente ? cliente.persona.genero : null );
      this.formularioCliente.controls["localidad"].setValue( cliente ? cliente.persona.localidad : null );      
      this.formularioCliente.controls["fecNacimiento"].setValue( cliente ? new Date(cliente.persona.fecNacimiento)  : null );                                                                                     
      this.formularioCliente.controls["dpto"].setValue( cliente ? cliente.persona.dpto : null );                                              
      this.formularioCliente.controls["piso"].setValue( cliente ? cliente.persona.piso : null );                                          
      this.formularioCliente.controls["telcelular"].setValue( cliente ? cliente.persona.telcelular : null );
      this.formularioCliente.controls["telfijo"].setValue( cliente ? cliente.persona.telfijo : null );
      this.formularioCliente.controls["tipoIdentificador"].setValue( cliente ? cliente.persona.tipoIdentificador : null );
      this.formularioCliente.controls["nroIdentificacion"].setValue( cliente ? cliente.persona.nroIdentificacion : null );
      this.formularioCliente.controls["razonSocial"].setValue( cliente ? cliente.persona.razonSocial : null );
      this.formularioCliente.controls["tipoCliente"].setValue( cliente ? cliente.persona.tipoPersona : "F" );                                              
      this.formularioCliente.controls["email"].setValue( cliente ? cliente.persona.email : null );
      this.formularioCliente.controls["ocupacion"].setValue( cliente ? cliente.persona.ocupacion : null );
      this.formularioCliente.controls["estadoCivil"].setValue( cliente ? cliente.persona.estadoCivil : null );
   

  };

  deleteCliente(cliente  : Cliente):void{
    this.confirmationService.confirm({
      message: 'Desea eliminar a "Id: '+ cliente.id + ' - ' + cliente.persona.apellido + ', '+ cliente.persona.nombre + '"?',
      accept: () => {
          this.service.deleteCliente(cliente.id).subscribe(
            
            () => {
              this.listaClientes = this.listaClientes.filter(x => x.id != cliente.id);
              this.messageService.add({severity:'success', detail:'Se eliminó correctamente la Cliente "Id: '+ cliente.id + ' - ' + cliente.persona.apellido + ', '+ cliente.persona.nombre + '" eliminada.'});
            }
            
          );
      }
  });
  }

   getListadoLlenarGrilla(): void {
   
    this.service.getClientes().subscribe(res => {     
     // console.log('recupera todas las clientes');
     // console.log(res); 
      this.listaClientes = res as Cliente[];       
      
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

     //se pasa por parámetro el idPais (Argentina = 10), de la 
     //configuración general del taller se debe obtener
     //this.serviceLocalidad.getProvincias(10).subscribe(res => {     
     // this.listaProvincias = res as Provincia[];            
       
     // }); 
     
  }

  get nombre() {
    return this.formularioCliente.get('nombre');
  }

  saveCliente(cliente  : Cliente):void{
    //console.log(this.clienteId);
    

    let payload: Cliente = {
      ...this.formularioCliente.value
    };

    console.log('saveCliente Payload: ');
    console.log(payload);
    
    if(!this.clienteId){
                           
       this.service.postCliente(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se agregó correctamente la Cliente "'+payload.persona.nombre+'" agregado'});
                  console.log('Respuesta POST: ' + res);
                }, 
                err => { console.log( err);
                         this.hasError = true; 
                }
        );

        

    }else{
      console.log(payload);
      this.service.putCliente(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Cliente "'+payload.persona.nombre+'" agregado'});
                  
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
  //this.contador = event.target.value.length;
  console.log('contador: '+this.contador)
  //if (this.contador >= 3){
        this.serviceLocalidad.getLocalidades(event.query).subscribe(
           res => {     
              this.listaLocalidades = res as Localidad[]; 
              console.log(res);
            }, 
            err => { console.log( err);
                    
            }     
    );
  //}

 }
/*
    this.service.putCliente(payload).subscribe( res => {
      
      let index = this.listaClientes.findIndex( x => x.id = payload.id);
      
      if( index >= 0 ){
        
        this.listaClientes[index] = res;
        
      }
*/
}


