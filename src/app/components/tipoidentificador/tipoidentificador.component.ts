import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { TipoIdentificador } from 'src/app/models/tipoidentificador.model';
import { TipoIdentificadorService } from 'src/app/services/tipoidentificador.service';

@Component({
  selector: 'app-tipoidentificador',
  templateUrl: './tipoidentificador.component.html',
  styleUrls: ['./tipoidentificador.component.css']
})
export class TipoidentificadorComponent implements OnInit {

 
  TipoIdentificadors: any; //ver

  listaTipoIdentificador: TipoIdentificador[];
  formularioTipoIdentificador: FormGroup;
  TipoIdentificadorId: number;
  hasError: boolean;  
  contador: number;
  editable:boolean;
  tituloHeader: string;
  accion: string;
  displayDialog: boolean;

  constructor(public service: TipoIdentificadorService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {

      this.getListadoTipoIdentificadors();

      this.formularioTipoIdentificador = this.formBuilder.group({
        id:  new FormControl(0),
        identificador: new FormControl(),
        descripcionIdentificador: new FormControl(null, 
                                                  Validators.compose([Validators.required, 
                                                                      Validators.minLength(3), 
                                                                      Validators.maxLength(40)
                                                                    ])
                                                  ),
        });
      
  }

  get descripcionIdentificador() {
    return this.formularioTipoIdentificador.get('descripcionIdentificador');
  }

  get identificador() {
    return this.formularioTipoIdentificador.get('identificador');
  }

  openDialog(TipoIdentificador? : TipoIdentificador,
             accion?: string): void{

            console.log(TipoIdentificador);

            this.displayDialog = true;
            this.hasError = false;
            this.TipoIdentificadorId = TipoIdentificador ? TipoIdentificador.id : null;
            this.accion = accion;
            
            switch(accion) {
              case "nuevo": 
                  this.tituloHeader = "Nuevo Tipo de Identificador";
                  this.formularioTipoIdentificador.enable();
                  break;
              case "consulta": 
                  this.tituloHeader = "Consulta Tipo de Identificador"
                  this.formularioTipoIdentificador.disable();
                  break;
              case "edicion": 
                  this.tituloHeader = "Editar Tipo de Identificador";
                  this.formularioTipoIdentificador.enable();
                  break;
              default:
                  this.tituloHeader = ""
                  break;
            }

            this.formularioTipoIdentificador.controls["id"].setValue( TipoIdentificador ? TipoIdentificador.id : 0 );
            this.formularioTipoIdentificador.controls["identificador"].setValue( TipoIdentificador ? TipoIdentificador.identificador : null );
            this.formularioTipoIdentificador.controls["descripcionIdentificador"].setValue( TipoIdentificador ? TipoIdentificador.descripcionIdentificador : null );

  } 

  getListadoTipoIdentificadors(): void {

    //console.log('recupera todos');

    this.service.getTipoIdentificadors().subscribe(res => { 
      this.listaTipoIdentificador = res as TipoIdentificador[];
      console.log(res);
    });   
    

  }


  saveTipoIdentificador(TipoIdentificador  : TipoIdentificador):void{

    let payload: TipoIdentificador = {
      ...this.formularioTipoIdentificador.value
    };

    console.log('saveTipoIdentificador Payload: ');
    console.log(payload);
    
    if(!this.TipoIdentificadorId){
                           
       this.service.postTipoIdentificador(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se agregó correctamente la Tipo de Identificador "'+payload.descripcionIdentificador+'" agregado'});
                  this.getListadoTipoIdentificadors();
                  
                }, 
                err => { console.log( err);
                         this.hasError = true; 
                }
        );
       
    }else{
  
      this.service.putTipoIdentificador(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Tipo de Identificador "'+payload.descripcionIdentificador+'" agregado'});                 
                  this.getListadoTipoIdentificadors();
                }, 
                err => { console.log( 'Error en actualización: '); 
                         console.log(err);
                        }
        
      );
      
    };
    
    this.displayDialog = false;
  
    
  }

  deleteTipoIdentificador(TipoIdentificador  : TipoIdentificador):void{
    this.confirmationService.confirm({
      message: 'Desea eliminar a "Id: '+ TipoIdentificador.id + ' - ' + TipoIdentificador.descripcionIdentificador + '"?',
      accept: () => {
          this.service.deleteTipoIdentificador(TipoIdentificador.id).subscribe(
            
            () => {
              this.listaTipoIdentificador = this.listaTipoIdentificador.filter(x => x.id != TipoIdentificador.id);
              this.messageService.add({severity:'success', detail:'Se eliminó correctamente el Tipo de Identificador "Id: '+ TipoIdentificador.id + ' - ' + TipoIdentificador.descripcionIdentificador + '" eliminada.'});
            }
            
          );
      }
    });
    this.getListadoTipoIdentificadors();
  }


}
