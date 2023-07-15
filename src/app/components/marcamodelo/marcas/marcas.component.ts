import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { Marca } from 'src/app/models/marca.model';
import { MarcamodeloService } from 'src/app/services/marcamodelo.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  listaMarcas : Marca[]; 
  formularioMarcas: FormGroup;
  displayDialog: boolean = false;
  //formularioMarca: FormGroup;
  marcaId: number;
  hasError: boolean;  
  contador: number;
  editable:boolean;
  tituloHeader: string;
  accion: string;

  constructor(public serviceMarcas: MarcamodeloService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
              ) { }

  ngOnInit(): void {

    this.formularioMarcas = this.formBuilder.group({
      id:  new FormControl(0),
      nombre: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)]))
    });
    
    
    this.serviceMarcas.getMarcas().subscribe(res => {     
      // console.log('recupera todas las marcas');
      
      this.listaMarcas = res as Marca[];       
      console.log(this.listaMarcas);        
      }); 
 

  }

  openDialog(marca? : Marca, 
              accion? : string ):void{

          this.displayDialog = true;
          this.hasError = false;
          this.marcaId = marca ? marca.id : null;
          this.accion = accion;

          switch(accion) {
          case "nuevo": 
            this.tituloHeader = "Nueva Marca";
            this.formularioMarcas.enable();
            break;
          case "consulta": 
            this.tituloHeader = "Consulta Marca"
            this.formularioMarcas.disable();
            break;
          case "edicion": 
            this.tituloHeader = "Editar Marca";
            this.formularioMarcas.enable();
            break;
          default:
            this.tituloHeader = ""
            break;
          }


          this.formularioMarcas.controls["id"].setValue( marca ? marca.id : 0 );
          this.formularioMarcas.controls["nombre"].setValue( marca ? marca.nombre : null );
          

          };


          deleteMarca(marca  : Marca):void{
            this.confirmationService.confirm({
              message: 'Desea eliminar a "Id: '+ marca.id + ' - ' +  marca.nombre + '"?',
              accept: () => {
                  this.serviceMarcas.deleteMarca(marca.id).subscribe(
                    
                    () => {
                      this.listaMarcas = this.listaMarcas.filter(x => x.id != marca.id);
                      this.messageService.add({severity:'success', detail:'Se eliminó correctamente la Marca "Id: '+ marca.id +  marca.nombre + '" eliminada.'});
                    }
                    
                  );
              }
          });
          }

          get nombre() {
            return this.formularioMarcas.get('nombre');
          }
        
          saveMarca(marca  : Marca):void{
            //console.log(this.marcaId);
            
        
            let payload: Marca = {
              ...this.formularioMarcas.value
            };
        
            console.log('saveMarca Payload: ');
            console.log(payload);
            
            if(!this.marcaId){
                                   
               this.serviceMarcas.postMarca(payload).subscribe(
                res => { 
                          this.messageService.add({severity:'success', detail:'Se agregó correctamente la Marca "'+payload.nombre+'" agregado'});
                          console.log('Respuesta POST: ' + res);
                        }, 
                        err => { console.log( err);
                                 this.hasError = true; 
                        }
                );
        
                
        
            }else{
              console.log(payload);
              this.serviceMarcas.putMarca(payload).subscribe(
                res => { 
                          this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Marca "'+payload.nombre+'" agregado'});
                          
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
