import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { Servicio } from 'src/app/models/servicio.model';
import { ServiciosService } from 'src/app/services/servicios.service';
//import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styles: []
})
export class ServiciosComponent implements OnInit {

  //constructor() { }

  //ngOnInit() {
  //}

//}



/*
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class serviciosComponent implements OnInit {
*/
  
  servicios: any; //ver

  listaServicio: Servicio[];
  formularioServicio: FormGroup;
  ServicioId: number;
  hasError: boolean;  
  contador: number;
  editable:boolean;
  tituloHeader: string;
  accion: string;
  displayDialog: boolean;

  constructor(public service: ServiciosService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {

      this.getListadoServicios();

      this.formularioServicio = this.formBuilder.group({
        id:  new FormControl(0),
        nombre: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
        descripcion: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])),
        });
      
  }

  get descripcion() {
    return this.formularioServicio.get('descripcion');
  }

  get nombre() {
    return this.formularioServicio.get('nombre');
  }

  openDialog(Servicio? : Servicio,
             accion?: string): void{

            console.log(Servicio);

            this.displayDialog = true;
            this.hasError = false;
            this.ServicioId = Servicio ? Servicio.id : null;
            this.accion = accion;
            
            switch(accion) {
              case "nuevo": 
                  this.tituloHeader = "Nuevo Servicio";
                  this.formularioServicio.enable();
                  break;
              case "consulta": 
                  this.tituloHeader = "Consulta Servicio"
                  this.formularioServicio.disable();
                  break;
              case "edicion": 
                  this.tituloHeader = "Editar Servicio";
                  this.formularioServicio.enable();
                  break;
              default:
                  this.tituloHeader = ""
                  break;
            }

            this.formularioServicio.controls["id"].setValue( Servicio ? Servicio.id : 0 );
            this.formularioServicio.controls["nombre"].setValue( Servicio ? Servicio.nombre : null );
            this.formularioServicio.controls["descripcion"].setValue( Servicio ? Servicio.descripcion : null );
           

  } 

  getListadoServicios(): void {

    //console.log('recupera todos');

    this.service.getServicios().subscribe(res => { 
      this.listaServicio = res as Servicio[];
      console.log(res);
    });   
    

  }


  saveServicio(Servicio  : Servicio):void{

    let payload: Servicio = {
      ...this.formularioServicio.value
    };

    console.log('saveServicio Payload: ');
    console.log(payload);
    
    if(!this.ServicioId){
                           
       this.service.postServicio(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se agregó correctamente el servicio "'+payload.nombre+'" agregado'});
                  console.log('Respuesta POST: ' + res);
                  this.getListadoServicios();
                }, 
                err => { console.log( err);
                         this.hasError = true; 
                }
        );
    }else{
  
      this.service.putServicio(payload).subscribe(
        res => { 
                  this.messageService.add({severity:'success', detail:'Se actualizó correctamente el Servicio "'+payload.nombre+'" agregado'});                  
                  this.getListadoServicios();
                }, 
                err => { console.log( 'Error en actualización: '); 
                         console.log(err);
                        }
      );
    };
    
    this.displayDialog = false;
  
    
  }

  deleteServicio(Servicio  : Servicio):void{
    this.confirmationService.confirm({
      message: 'Desea eliminar a "Id: '+ Servicio.id + ' - ' + Servicio.descripcion + '"?',
      accept: () => {
          this.service.deleteServicio(Servicio.id).subscribe(
            
            () => {
              this.listaServicio = this.listaServicio.filter(x => x.id != Servicio.id);
              this.messageService.add({severity:'success', detail:'Se eliminó correctamente el Servicio "Id: '+ Servicio.id + ' - ' + Servicio.descripcion + '" eliminada.'});
            }
            
          );
      }
    });
    this.getListadoServicios();
  }


}

