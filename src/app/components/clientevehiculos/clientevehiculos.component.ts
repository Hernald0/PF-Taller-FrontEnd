import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location } from '@angular/common';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { switchMap, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { Cliente } from 'src/app/models/cliente.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { MarcamodeloService } from 'src/app/services/marcamodelo.service';
import { Marca } from 'src/app/models/marca.model';
import { Modelovehiculo } from 'src/app/models/modelovehiculo.model';

@Component({
  selector: 'app-clientevehiculos',
  templateUrl: './clientevehiculos.component.html',
  styleUrls: ['./clientevehiculos.component.css']
})
export class ClientevehiculosComponent implements OnInit, OnDestroy {

  hasError: boolean;
  contador: number;
  editable: boolean;
  tituloHeader: string;
  displayDialog: boolean = false;
  accion: string;
  clienteId: number;
  vehiculoId: number;
  cliente: Cliente;
  listaVehiculos: Vehiculo[] = [];
  frmClienteVehiculos: any;
  marcaSeleccionada: Marca;
  marcas: Marca[];
  modelosDeMarcaSeleccionada: Modelovehiculo[];
  private unsubscribe$ = new Subject<void>();

  constructor(public serviceClientes: ClientesService,
              public marcamodeloService: MarcamodeloService,
              public formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private rutaActiva: ActivatedRoute,
              private _location: Location,
              private cdr: ChangeDetectorRef) { }

  goBack() {
    this._location.back();
  }

  ngOnInit(): void {
    this.clienteId = this.rutaActiva.snapshot.params.clienteId;

    this.rutaActiva.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (params: Params) => {
        this.clienteId = params.clienteId;
      }
    );

    this.frmClienteVehiculos = this.formBuilder.group({
      id: new FormControl(0),
      patente: new FormControl(null),
      color: new FormControl(null),
      numeroSerie: new FormControl(null),
      anio: new FormControl(null),
      marcavehiculo: new FormControl(null),
      modelovehiculo: new FormControl(null)
    });

    this.serviceClientes.getCliente(this.clienteId).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      res => { 
        this.cliente = res as Cliente;
        console.log('primera recuperación de los datos del cliente:', this.cliente);
        this.listaVehiculos = [...this.cliente.vehiculos];
      }
    );

    // Detectar cambios en la marca seleccionada y actualizar los modelos
    this.frmClienteVehiculos.get('marcavehiculo').valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(marcaSeleccionada => { 
      console.log('marcaSeleccionada', marcaSeleccionada);
      //this.actualizarModelos(marcaSeleccionada);
      this.actualizarModelos(marcaSeleccionada).subscribe(() => {
        // Resetear el modelo del vehículo cuando cambia la marca
        this.frmClienteVehiculos.get('modelovehiculo').setValue(null);
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  actualizarModelos(marcaSeleccionada: any): Observable<void> { // Agregar Observable<void> como tipo de retorno
    return new Observable<void>((observer) => { // Devolver un observable
        console.log('Método: actualizarModelos - Ejecuta actualizarModelos:', marcaSeleccionada);

        if (marcaSeleccionada) {
          console.log('Ingresa a la función', marcaSeleccionada);
          this.marcamodeloService.getModelos(marcaSeleccionada.id).subscribe(
            //this.marcamodeloService.getMarca(marcaSeleccionada.id).subscribe(
                 Marca => {
                    this.modelosDeMarcaSeleccionada = Marca.modelovehiculos;
                    console.log('Modelos recuperados', this.modelosDeMarcaSeleccionada);

                    // Asignar el primer modelo de la lista si está disponible
                    if (this.modelosDeMarcaSeleccionada.length > 0) {
                        const modeloDefault = this.modelosDeMarcaSeleccionada[0] as Modelovehiculo;
                        console.log('setea el modelo con el primer objeto', modeloDefault);
                        this.frmClienteVehiculos.get('modelovehiculo').setValue(modeloDefault);
                        console.log('Valor de modelovehiculo 1',  this.frmClienteVehiculos.get('modelovehiculo').value ) ;
                    } else {
                        this.frmClienteVehiculos.get('modelovehiculo').setValue(null);
                    }

                    // Detectar cambios después de actualizar los modelos
                    this.cdr.detectChanges();
                    console.log('Valor de modelovehiculo 2',  this.frmClienteVehiculos.get('modelovehiculo').value ) ;
                    //observer.next(); // Emitir un valor para completar la suscripción
                    console.log('Valor de modelovehiculo 3',  this.frmClienteVehiculos.get('modelovehiculo').value ) ;
                    observer.complete(); // Completar la suscripción
                    console.log('Valor de modelovehiculo 4',  this.frmClienteVehiculos.get('modelovehiculo').value ) ;
                },
                error => {
                    console.error('Error al obtener la marca:', error);
                    this.modelosDeMarcaSeleccionada = [];
                    observer.error(error); // Propagar el error a la suscripción
                }
                
            );console.log('Valor de modelovehiculo',  this.frmClienteVehiculos.get('modelovehiculo').value );
        } else {
            this.modelosDeMarcaSeleccionada = [];
            observer.next(); // Emitir un valor para completar la suscripción
            observer.complete(); // Completar la suscripción
        }
    });
  }
  /*
  compareModels(modelo1: Modelovehiculo, modelo2: Modelovehiculo): boolean {
    return modelo1 && modelo2 ? modelo1.id === modelo2.id : modelo1 === modelo2;
  }
  */

  openDialog(vehiculo?: Vehiculo, accion?: string): void {
    combineLatest([
      this.marcamodeloService.getMarcas(),
      of(vehiculo)
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([marcas, vehiculo]) => {
      this.marcas = marcas;

      if (this.marcas && this.marcas.length > 0) {
 
       const marcaPorDefecto = vehiculo ? 
                  this.marcas.find(marca => marca.id === vehiculo.modelovehiculo.idMarca) : 
                  this.marcas.length > 0 ? this.marcas[0] : null;
      
      
      if (marcaPorDefecto) {
       
        this.frmClienteVehiculos.get('marcavehiculo').setValue(marcaPorDefecto);
       
        this.actualizarModelos(marcaPorDefecto).subscribe(() => {
           // const modeloPorDefecto = vehiculo ? vehiculo.modelovehiculo : this.modelosDeMarcaSeleccionada[0];
           // console.log('ejecuta la asignación de modelo:', modeloPorDefecto);
           // this.frmClienteVehiculos.get('modelovehiculo').setValue(modeloPorDefecto);
           // console.log('muestra el modelo luego del seteo: ',  this.frmClienteVehiculos.get('modelovehiculo').value);
        });
      }
      /*
        this.frmClienteVehiculos.get('marcavehiculo').setValue(marcaPorDefecto);
        
        this.actualizarModelos(marcaPorDefecto).subscribe(() => {
          const modeloPorDefecto = vehiculo ? vehiculo.modelovehiculo : this.modelosDeMarcaSeleccionada[0];
          console.log('ejecuta la asignación de modelo:', modeloPorDefecto);
          this.frmClienteVehiculos.get('modelovehiculo').setValue(modeloPorDefecto);
        });*/
      }

      this.vehiculoId = vehiculo ? vehiculo.id : null;
      this.accion = accion;

      switch (accion) {
        case "nuevo":
          this.tituloHeader = "Nuevo Modelo";
          this.frmClienteVehiculos.enable();
          break;
        case "consulta":
          this.tituloHeader = "Consulta Modelo";
          this.frmClienteVehiculos.disable();
          break;
        case "edicion":
          this.tituloHeader = "Editar Modelo";
          this.frmClienteVehiculos.enable();
          break;
        default:
          this.tituloHeader = "";
          break;
      }

      this.frmClienteVehiculos.controls["id"].setValue(vehiculo ? vehiculo.id : null);
      this.frmClienteVehiculos.controls["patente"].setValue(vehiculo ? vehiculo.patente : null);
      this.frmClienteVehiculos.controls["color"].setValue(vehiculo ? vehiculo.color : null);
      this.frmClienteVehiculos.controls["numeroSerie"].setValue(vehiculo ? vehiculo.numeroSerie : null);
      this.frmClienteVehiculos.controls["anio"].setValue(vehiculo ? vehiculo.anio : null);

      //this.frmClienteVehiculos.controls["marcavehiculo"].setValue(vehiculo ? vehiculo.modelovehiculo.marcavehiculo : null);
      //console.log('Asigna modelovehiculo: ',vehiculo.modelovehiculo );
      //this.frmClienteVehiculos.controls["modelovehiculo"].setValue(vehiculo ? vehiculo.modelovehiculo : null);

      this.cdr.detectChanges();
    });

    this.displayDialog = true;
    this.hasError = false;
  }

  saveVehiculo(pCliente: Cliente): void {
    const vehiculoFormulario: Vehiculo = this.frmClienteVehiculos.value;
    console.log('Formulario de vehículo:', vehiculoFormulario);
    console.log('Modelo', vehiculoFormulario.modelovehiculo  );
    let payload = { "idCliente": pCliente.id, "vehiculo": vehiculoFormulario };
    //console.log('imprimo lo q  voy  guardar: ',payload );
    if (!vehiculoFormulario.id) {
      this.serviceClientes.postVehiculoCliente(payload).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        res => {
          let newCliente = res as Cliente;
          this.listaVehiculos = newCliente.vehiculos;
          console.log('Vehiculos a mostrar en NUEVO:',newCliente.vehiculos);
          this.messageService.add({ severity: 'success', detail: 'Se agregó correctamente el Modelo "' + vehiculoFormulario.modelovehiculo.nombreModelo + '" agregado' });
        },
        err => {
          this.hasError = true;
          console.log(err);
        }
      );
    } else {
      this.serviceClientes.putVehiculoCliente(payload).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        res => {
          const cliente = res as Cliente;
          console.log('recuperación post modificacion de los datos del cliente:', cliente);
              const listaVehiculos = cliente.vehiculos.map(vehiculo => ({
                id: vehiculo.id,
                patente: vehiculo.patente,
                color: vehiculo.color,
                numeroSerie: vehiculo.numeroSerie,
                anio: vehiculo.anio,            
                modelovehiculo: vehiculo.modelovehiculo
              }));
            
              this.cliente = { ...cliente, vehiculos: listaVehiculos };
              
              this.listaVehiculos = listaVehiculos;
              
              console.log('Modificación listado de vehículos: ',listaVehiculos);
              this.listaVehiculos = cliente.vehiculos;
          
              this.messageService.add({ severity: 'success', detail: 'Se actualizó correctamente el Modelo "' + vehiculoFormulario.modelovehiculo.nombreModelo + '" agregado' });
        },
        err => {
          console.error('Error al obtener el cliente:', err);
        }
      );
    }

    this.displayDialog = false;
    this.ngOnInit();
  }
  /*
  actualizarVehiculo(vehiculoActualizado: Vehiculo): void {
    const vehiculo = this.listaVehiculos.find(v => v.id === vehiculoActualizado.id);
    if (vehiculo) {
      vehiculo.anio = vehiculoActualizado.anio;
      vehiculo.color = vehiculoActualizado.color;
      vehiculo.modelovehiculo = vehiculoActualizado.modelovehiculo;
      vehiculo.numeroSerie = vehiculoActualizado.numeroSerie;
      vehiculo.patente = vehiculoActualizado.patente;
    }
  }*/

  deleteVehiculo(vehiculo: Vehiculo): void {
    let idVehiculo = vehiculo.id;
    let modeloVehiculo = vehiculo.modelovehiculo.nombreModelo;

    this.confirmationService.confirm({
      message: 'Desea eliminar a "Id: ' + vehiculo.id + ' - ' + vehiculo.modelovehiculo.nombreModelo + '"?',
      accept: () => {
        this.serviceClientes.deleteClienteVehiculo(vehiculo.id).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          () => {
            this.listaVehiculos = this.listaVehiculos.filter(x => x.id != vehiculo.id);
            this.messageService.add({ severity: 'success', detail: 'Se eliminó correctamente el Vehículo "Id: ' + idVehiculo + ' - ' + modeloVehiculo + '" eliminado.' });
          }
        );
      }
    });
  }
}
