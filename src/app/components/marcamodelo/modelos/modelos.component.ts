import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { Modelo } from 'src/app/models/modelo.model';
import { MarcamodeloService } from 'src/app/services/marcamodelo.service';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {

  listaModelos : Modelo[]; 
  formularioModelos: FormGroup;
  displayDialog: boolean = false;  
  marcaId: number;
  hasError: boolean;  
  contador: number;
  editable:boolean;
  tituloHeader: string;
  accion: string;

  constructor(public serviceModelos: MarcamodeloService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
              ) { }

  ngOnInit(): void {

    this.formularioModelos = this.formBuilder.group({
      id:  new FormControl(0),
      nombre: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)]))
    });
    
    
    this.serviceModelos.getModelos().subscribe(res => {     
      // console.log('recupera todas las personas');
      // console.log(res); 
       this.listaModelos = res as Modelo[];       
       
      }); 
 

  }

  openDialog(marca? : Modelo, 
              accion? : string ):void{

          this.displayDialog = true;
          this.hasError = false;
          this.marcaId = marca ? marca.id : null;
          this.accion = accion;

          switch(accion) {
          case "nuevo": 
            this.tituloHeader = "Nueva Modelo";
            this.formularioModelos.enable();
            break;
          case "consulta": 
            this.tituloHeader = "Consulta Modelo"
            this.formularioModelos.disable();
            break;
          case "edicion": 
            this.tituloHeader = "Editar Modelo";
            this.formularioModelos.enable();
            break;
          default:
            this.tituloHeader = ""
            break;
          }


          this.formularioModelos.controls["id"].setValue( marca ? marca.id : 0 );
          this.formularioModelos.controls["nombre"].setValue( marca ? marca.nombre : null );
          

          };


          deleteModelo(marca  : Modelo):void{
            this.confirmationService.confirm({
              message: 'Desea eliminar a "Id: '+ marca.id + ' - ' +  marca.nombre + '"?',
              accept: () => {
                  this.serviceModelos.deleteModelo(marca.id).subscribe(
                    
                    () => {
                      this.listaModelos = this.listaModelos.filter(x => x.id != marca.id);
                      this.messageService.add({severity:'success', detail:'Se eliminó correctamente la Modelo "Id: '+ marca.id +  marca.nombre + '" eliminada.'});
                    }
                    
                  );
              }
          });
          }

          get nombre() {
            return this.formularioModelos.get('nombre');
          }
        
          saveModelo(marca  : Modelo):void{
          
            
        
            let payload: Modelo = {
              ...this.formularioModelos.value
            };
        
            console.log('saveModelo Payload: ');
            console.log(payload);
            
            if(!this.marcaId){
                                   
               this.serviceModelos.postModelo(payload).subscribe(
                res => { 
                          this.messageService.add({severity:'success', detail:'Se agregó correctamente la Modelo "'+payload.nombre+'" agregado'});
                          console.log('Respuesta POST: ' + res);
                        }, 
                        err => { console.log( err);
                                 this.hasError = true; 
                        }
                );
        
                
        
            }else{
              console.log(payload);
              this.serviceModelos.putModelo(payload).subscribe(
                res => { 
                          this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Modelo "'+payload.nombre+'" agregado'});
                          
                        }, 
                        err => { console.log( 'Error en actualización: '); 
                                 console.log(err);
                                }
              );
        
            };
            
            this.displayDialog = false;
            
            this.ngOnInit();
            
          }

}          
