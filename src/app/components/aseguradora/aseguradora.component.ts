import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { AseguradoraService } from 'src/app/services/aseguradora.service';
import { Aseguradora } from 'src/app/models/aseguradora.model';

@Component({
  selector: 'app-aseguradora',
  templateUrl: './aseguradora.component.html',
  styleUrls: ['./aseguradora.component.css']
})
export class AseguradoraComponent implements OnInit {
  
  formularioAseguradora: FormGroup;
  listaAseguradoras: Aseguradora[];
  aseguradoraId: number;
  hasError: boolean;
  displayDialog: boolean;
  editable: boolean;

  constructor(  public serviceAseguradora: AseguradoraService,
                public formBuilder: FormBuilder,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) { }

  ngOnInit():void {

    this.serviceAseguradora.getAseguradoras().subscribe(res => {     
      
      this.listaAseguradoras = res as Aseguradora[];       
      
     }); 
                                                
    this.formularioAseguradora = this.formBuilder.group({
                                                        id:  new FormControl(0),
                                                        nombre: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
                                                        fechaAlta:new FormControl(null),
                                                        usuarioAlta: new FormControl(null),
                                                        fechaBaja:new FormControl(null),
                                                        usuarioBaja:new FormControl(null)
                                                      })  
  }

  get nombre() {
    return this.formularioAseguradora.get('nombre');
  }

  openDialog(aseguradora? : Aseguradora,
             esEditable?: boolean ):void{
    
    this.displayDialog = true;
    this.hasError = false;
    
    console.log(esEditable);
    this.editable = esEditable;
    if (aseguradora) 
      {         
        this.aseguradoraId =  aseguradora.id
      }
    else
      {       
        this.aseguradoraId =  null; 
      }
    
    //this.aseguradoraId =  ? aseguradora.id : null;    

    this.formularioAseguradora.controls["id"].setValue( aseguradora ? aseguradora.id : 0 );
    this.formularioAseguradora.controls["nombre"].setValue( aseguradora ? aseguradora.nombre : null );

  }

  saveAseguradora(aseguradora  : Aseguradora):void{
  
    let payload: Aseguradora = {
      ...this.formularioAseguradora.value
    };

    console.log('saveAseguradora Payload: ');
    console.log(payload);
    
    if(!this.aseguradoraId){
                           
       this.serviceAseguradora.postAseguradora(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se agregó correctamente la Aseguradora "'+payload.nombre+'" agregado'});
                  console.log('Respuesta POST: ' + res);
                  this.serviceAseguradora.getAseguradoras().subscribe(res => {                         
                    this.listaAseguradoras = res ;                           
                   }); 
                }, 
                err => { console.log( err);
                         this.hasError = true; 
                }
        );

        

    }else{
      console.log(payload);
      this.serviceAseguradora.putAseguradora(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Aseguradora "'+payload.nombre+'" agregado'});
                  this.serviceAseguradora.getAseguradoras().subscribe(res => {                         
                    this.listaAseguradoras = res ;                           
                   }); 
                  
                }, 
                err => { console.log( 'Error en actualización: '); 
                         console.log(err);
                        }
      
      );

    };
    
    this.displayDialog = false;
    
    
    
    
  }

  deleteAseguradora(aseguradora  : Aseguradora):void{
    this.confirmationService.confirm({
      message: 'Desea eliminar a "Id: '+ aseguradora.id + ' - ' + aseguradora.nombre + '"?',
      accept: () => {
          this.serviceAseguradora.deleteAseguradora(aseguradora.id).subscribe(
            
            () => {
              this.listaAseguradoras = this.listaAseguradoras.filter(x => x.id != aseguradora.id);
              this.messageService.add({severity:'success', detail:'Se eliminó correctamente la Persona "Id: '+ aseguradora.id + ' - ' + aseguradora.nombre + '" eliminada.'});
            }
            
          );
      }
  });
  }

}
