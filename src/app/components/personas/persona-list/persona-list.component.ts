import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

//----------------------
import { EstadoCivil } from 'src/app/models/EstadoCivil.model';
import { Genero } from 'src/app/models/genero.model';
import { Localidad } from 'src/app/models/localidad.model';
import { Persona } from 'src/app/models/persona.model';
import { Provincia } from 'src/app/models/provincia.model';
import { TipoIdentificador } from 'src/app/models/tipoidentificador.model';
//----------------------
import { EstadoCivilService } from 'src/app/services/estadocivil.service';
import { GenerosService } from 'src/app/services/generos.service';
import { LocalidadService } from 'src/app/services/localidad.service';
import { PersonasService } from 'src/app/services/personas.service';
import { TipoIdentificadorService } from 'src/app/services/tipo-identificador.service';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {

  listaPersonas: Persona[];
  listaGeneros: Genero[];
  //listaProvincias: Provincia[];
  listaLocalidades: Localidad[];
  listaTipoIdentificadores: TipoIdentificador[];
  listaEstadoCivil: EstadoCivil[];
  displayDialog: boolean = false;
  formularioPersona: FormGroup;
  personaId: number;
  hasError: boolean;  
  contador: number;
  
 

  constructor(public service:PersonasService,
              public serviceGenero:GenerosService,
              public serviceTipoIdentificador:TipoIdentificadorService,
              public serviceEstadoCivil: EstadoCivilService,
              public serviceLocalidad: LocalidadService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() :void {
    
    this.getListadoLlenarGrilla();
     
                                                
    this.formularioPersona = this.formBuilder.group({
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
                                                   tipoPersona :  new FormControl('F'),                                              
                                                   email : new FormControl(null, Validators.compose([Validators.email])),
                                                   ocupacion :new FormControl(null),
                                                   estadoCivil :new FormControl(null)
                                                  })                                                  
    
  }

  openDialog(persona? : Persona):void{
    
      this.displayDialog = true;
      this.hasError = false;
      this.personaId = persona ? persona.id : null;

      this.formularioPersona.controls["id"].setValue( persona ? persona.id : 0 );
      this.formularioPersona.controls["nombre"].setValue( persona ? persona.nombre : null );
      this.formularioPersona.controls["apellido"].setValue( persona ? persona.apellido : null );
      this.formularioPersona.controls["direccion"].setValue( persona ? persona.direccion : null );
      this.formularioPersona.controls["nroDireccion"].setValue( persona ? persona.nroDireccion : null );
      this.formularioPersona.controls["genero"].setValue( persona ? persona.genero : null );
      this.formularioPersona.controls["localidad"].setValue( persona ? persona.localidad : null );
      this.formularioPersona.controls["fecNacimiento"].setValue( persona ? new Date(persona.fecNacimiento)  : null );                                                                                     
      this.formularioPersona.controls["dpto"].setValue( persona ? persona.dpto : null );                                              
      this.formularioPersona.controls["piso"].setValue( persona ? persona.piso : null );                                          
      this.formularioPersona.controls["telcelular"].setValue( persona ? persona.telcelular : null );
      this.formularioPersona.controls["telfijo"].setValue( persona ? persona.telfijo : null );
      this.formularioPersona.controls["tipoIdentificador"].setValue( persona ? persona.tipoIdentificador : null );
      this.formularioPersona.controls["nroIdentificacion"].setValue( persona ? persona.nroIdentificacion : null );
      this.formularioPersona.controls["razonSocial"].setValue( persona ? persona.razonSocial : null );
      this.formularioPersona.controls["tipoPersona"].setValue( persona ? persona.tipoPersona : "F" );                                              
      this.formularioPersona.controls["email"].setValue( persona ? persona.email : null );
      this.formularioPersona.controls["ocupacion"].setValue( persona ? persona.ocupacion : null );
      this.formularioPersona.controls["estadoCivil"].setValue( persona ? persona.estadoCivil : null );
   

  };

  deletePersona(persona  : Persona):void{
    this.confirmationService.confirm({
      message: 'Desea eliminar a "Id: '+ persona.id + ' - ' + persona.apellido + ', '+ persona.nombre + '"?',
      accept: () => {
          this.service.deletePersona(persona.id).subscribe(
            
            () => {
              this.listaPersonas = this.listaPersonas.filter(x => x.id != persona.id);
              this.messageService.add({severity:'success', detail:'Se eliminó correctamente la Persona "Id: '+ persona.id + ' - ' + persona.apellido + ', '+ persona.nombre + '" eliminada.'});
            }
            
          );
      }
  });
  }

   getListadoLlenarGrilla(): void {
   
    this.service.getPersonas().subscribe(res => {     
      console.log('recupera todas las personas'); 
      this.listaPersonas = res as Persona[];       
      
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
    return this.formularioPersona.get('nombre');
  }

  savePersona(persona  : Persona):void{
    //console.log(this.personaId);
    

    let payload: Persona = {
      ...this.formularioPersona.value
    };

    console.log('savePersona Payload: ');
    console.log(payload);
    
    if(!this.personaId){
                           
       this.service.postPersona(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se agregó correctamente la Persona "'+payload.nombre+'" agregado'});
                  console.log('Respuesta POST: ' + res);
                }, 
                err => { console.log( err);
                         this.hasError = true; 
                }
        );

        

    }else{
      console.log(payload);
      this.service.putPersona(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Persona "'+payload.nombre+'" agregado'});
                  
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
    this.service.putPersona(payload).subscribe( res => {
      
      let index = this.listaPersonas.findIndex( x => x.id = payload.id);
      
      if( index >= 0 ){
        
        this.listaPersonas[index] = res;
        
      }
*/
}


