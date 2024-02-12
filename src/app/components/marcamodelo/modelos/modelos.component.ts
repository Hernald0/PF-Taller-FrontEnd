import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { Marca } from 'src/app/models/marca.model';
import { Modelovehiculo } from 'src/app/models/modelovehiculo.model';
import { mvvmModelovehiculo } from 'src/app/models/mvvmModeloVehiculo.model';
import { MarcamodeloService } from 'src/app/services/marcamodelo.service';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {

  listaModelos : Modelovehiculo[]; 
  marca: Marca;
  formularioModelos: FormGroup;
  displayDialog: boolean = false;  
  marcaId: number;
  modeloId: number;
  hasError: boolean;  
  contador: number;
  editable:boolean;
  tituloHeader: string;
  accion: string;

  constructor(public serviceModelos: MarcamodeloService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private rutaActiva: ActivatedRoute,
              private _location: Location
              ) { }

  goBack(){
    this._location.back();
  }
  
  ngOnInit(): void 
  
  {
    
          this.marcaId = this.rutaActiva.snapshot.params.marcaId;      
          
          this.rutaActiva.params.subscribe(
            (params: Params) => {
              this.marcaId = params.marcaId ;
            }
          );
            

          this.formularioModelos = this.formBuilder.group({
            id:  new FormControl(0),
            nombre: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)]))
          });
          
          
          this.serviceModelos.getMarca(this.marcaId).subscribe(
            res => {     
                        console.log('recupera todas las modelos de una marca');
                        console.log(res); 
                        this.marca = res as Marca;       
                        console.log('antes de la copia'); 
                        
                        // [].concat(this.marca.Modelos);
                        //JSON.parse(JSON.stringify(arr)) as typeof arr;
                        console.log('luego de la copia'); 
                        console.log(this.marca);
                        this.listaModelos = [...this.marca.modelovehiculos];
                        console.log(this.listaModelos);
                    }
          ); 
            //this.listaModelos = JSON.parse(JSON.stringify(this.marca.Modelos)) as (typeof Modelovehiculo)[];

  }

  openDialog( modelo? : Modelovehiculo, 
              accion? : string 
            ):void            
  {          
         
                this.displayDialog = true;
                this.hasError = false;
                this.modeloId = modelo ? modelo.id : null;
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

                //console.log("modelo.id "+ modelo.id );
                this.formularioModelos.controls["id"].setValue( modelo ? modelo.id : null );
                this.formularioModelos.controls["nombre"].setValue( modelo ? modelo.nombre : null );                
                
  };


  deleteModelo(modelo  : Modelovehiculo
              ) : void
  {
    this.confirmationService.confirm(
      {
      message: 'Desea eliminar a "Id: '+ modelo.id + ' - ' +  modelo.nombre + '"?',
      accept: () => {
          this.serviceModelos.deleteModelo(modelo.id).subscribe(            
            () => {
              this.listaModelos = this.listaModelos.filter(x => x.id != modelo.id);
              this.messageService.add({severity:'success', detail:'Se eliminó correctamente la Modelo "Id: '+ modelo.id +  modelo.nombre + '" eliminada.'});
            }
            
          );
        }
      }
    );
  }

  get nombre() {
    return this.formularioModelos.get('nombre');
  }

  get id() {
    return this.formularioModelos.get('id');
  }


  saveModelo( marca : Marca,
              modelovehiculo: Modelovehiculo) : void
  {            
    
          console.log(marca);
          console.log(modelovehiculo);
          const modelovehiculo1: Modelovehiculo = this.formularioModelos.value;
          
          console.log("modelovehiculo1 " + modelovehiculo1.id);
          console.log("modelovehiculo1.nombre" + modelovehiculo1.nombre);
          /*           
          let modelo2: new Modelovehiculo() = {
            ...this.formularioModelos.value
          };*/
          
          let payload2: mvvmModelovehiculo ={
            idMarca : marca.id,               
            nombreMarca : marca.nombre,    
            idModelo : modelovehiculo1.id,
            nombreModelo : modelovehiculo1.nombre  
          };

          console.log('saveModelo Payload2: ');
          console.log(payload2);
          
          if(!payload2.idModelo){
                                  
              this.serviceModelos.postModelo(payload2).subscribe(
              res => {  let newModelo = res as Modelovehiculo;
                        this.listaModelos.push(newModelo);
                        this.messageService.add({severity:'success', detail:'Se agregó correctamente la Modelo "'+ payload2.nombreModelo +'" agregado'});
                        console.log('Respuesta POST: ' + res);
                      }, 
                      err => { console.log( err);
                                this.hasError = true; 
                      }
              );

              

          }else{
            console.log(payload2);
            this.serviceModelos.putModelo(payload2).subscribe(
              res => { 
                        this.messageService.add({severity:'success', detail:'Se actualizó correctamente la Modelo "'+payload2.nombreModelo+'" agregado'});
                        this.actualizarNombreModelo(modelovehiculo1);
                      }, 
                      err => { console.log( 'Error en actualización: '); 
                                console.log(err);
                              }
            );

          };
          
          this.displayDialog = false;
          
          this.ngOnInit();
    
  }

    
  actualizarNombreModelo(modeloActualizado: Modelovehiculo): void {
    const modelo = this.listaModelos.find(m => m.id === modeloActualizado.id);
    if (modelo) {
      modelo.nombre = modeloActualizado.nombre;
    }
  }

}          
