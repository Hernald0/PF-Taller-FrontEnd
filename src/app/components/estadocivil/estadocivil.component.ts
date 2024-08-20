import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EstadoCivil } from 'src/app/models/estadocivil.model';
import { EstadoCivilService } from 'src/app/services/estadocivil.service';

@Component({
  selector: 'app-estadocivil',
  templateUrl: './estadocivil.component.html',
  styleUrls: ['./estadocivil.component.css']
})
export class EstadocivilComponent implements OnInit {


  estadosCiviles: any; //ver

  listaEstadoCivil: EstadoCivil[];
  formularioEstadoCivil: FormGroup;
  estadoCivilId: number;
  hasError: boolean;  
  contador: number;
  editable:boolean;
  tituloHeader: string;
  accion: string;
  displayDialog: boolean;

  constructor(public service: EstadoCivilService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {

      this.getListadoEstadoCiviles();

      this.formularioEstadoCivil = this.formBuilder.group({
        id:  new FormControl(0),
        descripcion: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
        });
      
  }

  get descripcion() {
    return this.formularioEstadoCivil.get('descripcion');
  }

  openDialog(estadoCivil? : EstadoCivil,
             accion?: string): void{

            console.log(estadoCivil);

            this.displayDialog = true;
            this.hasError = false;
            this.estadoCivilId = estadoCivil ? estadoCivil.id : null;
            this.accion = accion;
            
            switch(accion) {
              case "nuevo": 
                  this.tituloHeader = "Nuevo Estado Civil";
                  this.formularioEstadoCivil.enable();
                  break;
              case "consulta": 
                  this.tituloHeader = "Consulta Estado Civil"
                  this.formularioEstadoCivil.disable();
                  break;
              case "edicion": 
                  this.tituloHeader = "Editar Estado Civil";
                  this.formularioEstadoCivil.enable();
                  break;
              default:
                  this.tituloHeader = ""
                  break;
            }

            this.formularioEstadoCivil.controls["id"].setValue( estadoCivil ? estadoCivil.id : 0 );
            this.formularioEstadoCivil.controls["descripcion"].setValue( estadoCivil ? estadoCivil.descripcion : null );
           

  } 

  getListadoEstadoCiviles(): void {

    //console.log('recupera todos');

    this.service.getEstadoCivils().subscribe(res => { 
      this.listaEstadoCivil = res as EstadoCivil[];
      console.log(res);
    });   
    

  }


  saveEstadoCivil(estadoCivil  : EstadoCivil):void{

    let payload: EstadoCivil = {
      ...this.formularioEstadoCivil.value
    };

    console.log('saveEstadoCivil Payload: ');
    console.log(payload);
    
    if(!this.estadoCivilId){
                           
       this.service.postEstadoCivil(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se agregó correctamente la Persona "'+payload.descripcion+'" agregado'});
                  console.log('Respuesta POST: ' + res);
                  this.getListadoEstadoCiviles();
                }, 
                err => { console.log( err);
                         this.hasError = true; 
                }
        );
    }else{
  
      this.service.putEstadoCivil(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Persona "'+payload.descripcion+'" agregado'});                  
                  this.getListadoEstadoCiviles();
                }, 
                err => { console.log( 'Error en actualización: '); 
                         console.log(err);
                        }
      );
    };
    
    this.displayDialog = false;
  
    
  }

  deleteEstadoCivil(estadoCivil  : EstadoCivil):void{
    this.confirmationService.confirm({
      message: 'Desea eliminar a "Id: '+ estadoCivil.id + ' - ' + estadoCivil.descripcion + '"?',
      accept: () => {
          this.service.deleteEstadoCivil(estadoCivil.id).subscribe(
            
            () => {
              //this.listaEstadoCivil = this.listaEstadoCivil.filter(x => x.id != estadoCivil.id);
              this.getListadoEstadoCiviles();
              this.messageService.add({severity:'success', detail:'Se eliminó correctamente el Estado Civil "Id: '+ estadoCivil.id + ' - ' + estadoCivil.descripcion + '" eliminada.'});
            }
            
          );
      }
    });
    this.getListadoEstadoCiviles();
  }

}
