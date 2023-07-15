import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { Genero } from 'src/app/models/genero.model';
import { GenerosService } from 'src/app/services/generos.service';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {

  
  generos: any; //ver

  listaGenero: Genero[];
  formularioGenero: FormGroup;
  GeneroId: number;
  hasError: boolean;  
  contador: number;
  editable:boolean;
  tituloHeader: string;
  accion: string;
  displayDialog: boolean;

  constructor(public service: GenerosService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {

      this.getListadoGeneros();

      this.formularioGenero = this.formBuilder.group({
        id:  new FormControl(0),
        descripcion: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
        });
      
  }

  get descripcion() {
    return this.formularioGenero.get('descripcion');
  }

  openDialog(Genero? : Genero,
             accion?: string): void{

            console.log(Genero);

            this.displayDialog = true;
            this.hasError = false;
            this.GeneroId = Genero ? Genero.id : null;
            this.accion = accion;
            
            switch(accion) {
              case "nuevo": 
                  this.tituloHeader = "Nuevo Género";
                  this.formularioGenero.enable();
                  break;
              case "consulta": 
                  this.tituloHeader = "Consulta Género"
                  this.formularioGenero.disable();
                  break;
              case "edicion": 
                  this.tituloHeader = "Editar Género";
                  this.formularioGenero.enable();
                  break;
              default:
                  this.tituloHeader = ""
                  break;
            }

            this.formularioGenero.controls["id"].setValue( Genero ? Genero.id : 0 );
            this.formularioGenero.controls["descripcion"].setValue( Genero ? Genero.descripcion : null );
           

  } 

  getListadoGeneros(): void {

    //console.log('recupera todos');

    this.service.getGeneros().subscribe(res => { 
      this.listaGenero = res as Genero[];
      console.log(res);
    });   
    

  }


  saveGenero(Genero  : Genero):void{

    let payload: Genero = {
      ...this.formularioGenero.value
    };

    console.log('saveGenero Payload: ');
    console.log(payload);
    
    if(!this.GeneroId){
                           
       this.service.postGenero(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se agregó correctamente la Persona "'+payload.descripcion+'" agregado'});
                  console.log('Respuesta POST: ' + res);
                  this.getListadoGeneros();
                }, 
                err => { console.log( err);
                         this.hasError = true; 
                }
        );
    }else{
  
      this.service.putGenero(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Persona "'+payload.descripcion+'" agregado'});                  
                  this.getListadoGeneros();
                }, 
                err => { console.log( 'Error en actualización: '); 
                         console.log(err);
                        }
      );
    };
    
    this.displayDialog = false;
  
    
  }

  deleteGenero(Genero  : Genero):void{
    this.confirmationService.confirm({
      message: 'Desea eliminar a "Id: '+ Genero.id + ' - ' + Genero.descripcion + '"?',
      accept: () => {
          this.service.deleteGenero(Genero.id).subscribe(
            
            () => {
              this.listaGenero = this.listaGenero.filter(x => x.id != Genero.id);
              this.messageService.add({severity:'success', detail:'Se eliminó correctamente el Género "Id: '+ Genero.id + ' - ' + Genero.descripcion + '" eliminada.'});
            }
            
          );
      }
    });
    this.getListadoGeneros();
  }


}
