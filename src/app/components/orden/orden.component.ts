import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { Aseguradora } from 'src/app/models/aseguradora.model';
import { Cliente } from 'src/app/models/cliente.model';
import { ItemDto } from 'src/app/models/ItemDto.model';
import { Servicio } from 'src/app/models/servicio.model';
import { Turno } from 'src/app/models/turno.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { PopupService } from '../servicios/pop-up.service';
import { PopUpDatosService } from '../servicios/pop-up-datos.service';
import { GlobalService } from 'src/app/services/global.service';
import { VentaService } from 'src/app/services/venta.service';
import { OrdenService } from 'src/app/services/orden.service';
import { AseguradoraService } from 'src/app/services/aseguradora.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
    ordenId: number = null;
    ordenForm: FormGroup;
    items: FormArray;
    mostrarPopup: boolean = false;
    datos: any;
    vendedores = [{ label: 'Vendedor 1', value: 1 }, { label: 'Vendedor 2', value: 2 }];
    productos = [{ nombre: 'Cambio de Aceite', importe: 130, tipo: 'Servicio' }, { nombre: 'Chapería', importe: 12000, tipo: 'Servicio' }, { nombre: 'Filtro de Aire', importe: 300, tipo: 'Repuesto' }];
    tipos = [{ label: 'Servicio', value: 'Servicio' }, { label: 'Repuesto', value: 'Repuesto' }];
    cuentas = [{ label: 'Cuenta 1', value: 1 }, { label: 'Cuenta 2', value: 2 }];
    suggestions: ItemDto[] = [];
    isExpanded = false;
    valorIVA: number = 0;
    totalIVA: number = 0;
    totalServicios: number = 0;
    totalRepuestos: number = 0;
    totalBonificacionItems: number = 0;
    camposReadOnly: boolean = false;
    dataResumenCliente : string;
    dataResumenVehiculo: String;
    listaSeguros : Aseguradora[];
    value: number = 50;
    label_status: string = 'MEDIO';
    idxEditar: number  = 0;
  
    marcasTarjeta = [
      { label: '', value: '' },
      { label: 'Visa', value: 'VISA' },
      { label: 'Mastercard', value: 'MASTERCARD' },
      { label: 'Amex', value: 'AMEX' },
      { label: 'Naranja', value: 'NARANJA' },
      // agregá las que necesites
    ];
    private unsubscribe$ = new Subject<void>();
    displayDialog: boolean = false;
    private searchTerms = new Subject<string>();
    turnoRecuperado : Turno;
  
    private modo: 'ver' | 'editar' = 'editar';
  
    constructor(private fb: FormBuilder,
                private servicioRepuestosServicios: ServiciosService,
                private popupService: PopupService,
                private datosService: PopUpDatosService,
                private globalService: GlobalService,
                //private ventaService: VentaService,
                private ordenService: OrdenService,
                private aseguradoraService:  AseguradoraService,
                private _location: Location,
                private rutaActiva: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private route: ActivatedRoute
                
    ) {
      this.route.queryParams.subscribe(params => {
        if (params['modo'] === 'ver') {
          this.modo = 'ver';
        }
      });
      }
  
     goBack(){
      this._location.back();
    }
  
    ngOnInit() {
      
      this.ordenId = this.rutaActiva.snapshot.params.orderId;
      console.log('this.ordenId: ', this.ordenId);
      /*
      this.rutaActiva.params.pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          (params: Params) => {
            this.ordenId = params.ordenId;
          }
        );*/
  
     
      this.ordenForm = this.fb.group({
                                      idTurno: [''], 
                                      fechaRecepcion: [new Date(), Validators.required],
                                      usuario: ['UsuarioLogueado', Validators.required],
                                      cliente: this.fb.group({
                                              idCliente: [''], 
                                              nombreCliente: [''], 
                                              telefonoCliente: [''], 
                                              direccionCliente: ['']
  
                                            }),
                                      vehiculo: this.fb.group({
                                              idVehiculo: [''], 
                                              descVehiculo: [''], 
                                              color: [''], 
                                              patente: [''],
                                              numeroserie: [''],
                                              anio: ['']
                                            }),
                                      items: this.fb.array([]), //new FormArray([]),                                                                          
                                      efectivo: [0],
                                      montoTotal:[],
                                      nrooperacion : [],
                                      cuentaCorriente: [0],
                                      tarjetaCredito: [null],
                                      montoTarjetaCredito:  [{ value: '', disabled: true }] ,
                                      observaciones: [''],            
                                      kilometraje:[0],
                                      combustible: [0],
                                      aseguradora:[0],
                                      nroSiniestro : [''],
                                      inspector: [''],
                                      franquicia: [0],
                                    });
  
      
    
      this.items = this.ordenForm.get('items') as FormArray;
      
      this.ordenForm.get('items')!.valueChanges
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => {
            this.recalcularTotalesYCampos();
          });
  
      this.ordenForm.get('tarjetaCredito')!.valueChanges.subscribe(value => {
        if (value) {
          this.ordenForm.get('montoTarjetaCredito')!.enable();
        } else {
          this.ordenForm.get('montoTarjetaCredito')!.disable();
        }
      });
  
       this.aseguradoraService.getAseguradoras().subscribe(res => {     
        console.log(res);
        this.listaSeguros = res as Aseguradora[];       
        this.listaSeguros.unshift({
                                  id: 0,
                                  nombre: "Sin Aseguradora"
                                } as Aseguradora);
  
       }); 
   
  
        
      if (this.ordenId) {
        
        // Se está editando una venta existente
        this.ordenService.getOrden(this.ordenId).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(res => {
                            this.turnoRecuperado = res  as Turno;
                            console.log('this.ordenRecuperado', this.turnoRecuperado);
                            this.ordenForm.patchValue({
                                                        idTurno: this.ordenId,
                                                        fechaRecepcion:new Date(this.turnoRecuperado.fecha),
                                                         
                                                        //items:  this.ventaRecuperada.items,
                                                        cliente: {
                                                          idCliente: this.turnoRecuperado.cliente.id,
                                                          nombreCliente:  ((this.turnoRecuperado.cliente.persona.tipoPersona == 'F') 
                                                                            ? this.turnoRecuperado.cliente.persona.apellido + ", " + this.turnoRecuperado.cliente.persona.nombre 
                                                                            : this.turnoRecuperado.cliente.persona.razonSocial),
                                                          telefonoCliente: this.turnoRecuperado.cliente.persona.telcelular,
                                                          direccionCliente: this.turnoRecuperado.cliente.persona.direccion
                                                        }, 
                                                        vehiculo: {
                                                            idVehiculo: this.turnoRecuperado.vehiculo.id,
                                                            descVehiculo : this.turnoRecuperado.vehiculo.modelovehiculo.nombreModelo,
                                                            color: this.turnoRecuperado.vehiculo.color,
                                                            patente: this.turnoRecuperado.vehiculo.patente,
                                                            numeroserie: this.turnoRecuperado.vehiculo.numeroSerie,
                                                            anio : this.turnoRecuperado.vehiculo.anio,
                                                        },
                                                        
                                                        observaciones: this.turnoRecuperado.motivoConsulta
                            });
        
        this.dataResumenCliente = getDataResumenCliente(this.turnoRecuperado.cliente) ;
        this.dataResumenVehiculo = getDataResumenVehiculo(this.turnoRecuperado.vehiculo);
  
        this.items.clear();
  
        // Primero agregamos la fila vacía
        this.items.push(this.createItem());
  
        //Luego insertamos los ítems de la venta después del primero (es decir, desde índice 1)
        if (this.turnoRecuperado.servicios) 
        this.turnoRecuperado.servicios.forEach((detalle, idx) => {
          this.items.insert(idx + 1, this.createItemFromDetalle(detalle));
        }); 
  
        this.recalcularTotalesYCampos();
        /*
        console.log('Items en el form:');
        this.items.controls.forEach((item: FormGroup, i: number) => {
          console.log(`Item ${i}`, {
            tipo: item.get('tipo').value,
            subtotal: item.get('subtotal').value,
            bonificacion: item.get('bonificacion').value,
            iva: item.get('iva').value
          });
        });*/
        
       
  
  
        });
      } else {
        // Nueva venta
        this.items.push(this.createItem());
      } 
  
       console.log('se protejen los campos',this.modo );
      if (this.modo === 'ver') {
        this.ordenForm.disable();
        this.protejerCampos(true);
      }
  
    }
  
    onAseguradoraChange(event: any) {
    // event.value debería ser el id, pero por si acaso normalizamos:
    const selected = event.value;
    console.log('onAseguradoraChange: ',selected);
    const id = (typeof selected === 'object')
    ? (selected.id !== undefined && selected.id !== null
        ? selected.id
        : (selected.Id !== undefined && selected.Id !== null
            ? selected.Id
            : null))
    : selected;
    this.ordenForm.get('aseguradora')!.setValue(id);
    console.log('Aseguradora seleccionada (forzada a id):', id);
    }
  
    
    createItemFromDetalle(detalle: Servicio): FormGroup {
      
      let idx =  this.items.length;
  
      return this.fb.group({   
       
          id: [detalle.id || null],
          tipo: 'Servicio',
          cantidad: 1,
          precioUnitario: [detalle.precioVenta ],
          iva: detalle.precioVenta * 1.21,
          bonificacion: [0],
          producto: [detalle],   
          subtotal:  [0]
          /*id: [detalle.Id || null],
          tipo: [detalle.tipo || null],
          cantidad: [detalle.cantidad || 0 ],
          precioUnitario: [detalle.precioUnitario || 0],
          iva: [detalle.iva || 0],
          bonificacion: [detalle.bonificacion || 0],
          producto: [detalle|| null],  //  este campo es necesario para el HTML
          subtotal:  [detalle.subtotal || null]*/
      });
  
       
       
    }
  
    createItem(): FormGroup {
      return this.fb.group({
        id: ['', Validators.required],
        producto: ['', Validators.required],
        precioUnitario: [0, Validators.required],
        cantidad: [1, Validators.required],
        tipo: ['', Validators.required],
        bonificacion: [0],
        subtotal: [0],
        iva: [0]
      });
    }
  
     calculoCombustible(valor : number): void{
  
        this.value = this.value + valor;
  
          switch (this.value)
          {
          case   0:
              this.label_status = 'VACIO';
              break;
  
          case   25:
              this.label_status = '1/4';
              break;
  
          case   50:
              this.label_status = 'MEDIO';
              break;
         
          case   75:
              this.label_status = '3/4';
              break;
        
          case   100:
              this.label_status = 'LLENO';
              break;
           
      }
  
    }
  
  editItem(index: number) {
    if (this.idxEditar === index) {
      // Si ya se está editando esta fila, entonces se confirma
      this.idxEditar = 0; // Se desactiva la edición
      // Acá podrías hacer algo como recalcular el subtotal, guardar en backend, etc.
    } else {
      this.idxEditar = index;
    }
  }
  
  
  addItem(index: number) {
  
     
  
       const itemFormGroup = this.items.at(index) as FormGroup;
  
       if (itemFormGroup.get('id').value === ''       ||
           itemFormGroup.get('producto').value === '' ||
           itemFormGroup.get('cantidad').value === '' ||
           itemFormGroup.get('cantidad').value <= 0   ||
           itemFormGroup.get('bonificacion').value < 0 
          ) return;
  
       const nuevoItem = this.createItem(); // Este será el item vacío para el próximo ingreso
       
     
       // Crear un nuevo registro basado en los valores actuales
       const nuevoItemCompleto = this.fb.group({
           id: itemFormGroup.get('id').value, 
           producto: itemFormGroup.get('producto').value,
           precioUnitario: itemFormGroup.get('precioUnitario').value, 
           cantidad: itemFormGroup.get('cantidad').value,
           tipo: itemFormGroup.get('tipo').value.charAt(0).toUpperCase() + itemFormGroup.get('tipo').value.slice(1),
           bonificacion: itemFormGroup.get('bonificacion').value,
           subtotal: this.calcularSubtotal(index),
           iva: this.calcularIVA(index) // Considerando que ya tienes una función para calcular IVA
       });
   
       // Agregar el nuevo registro a la lista de items
       this.items.push(nuevoItemCompleto);
   
       // Resetear los valores del registro actual para la entrada de un nuevo ítem
       itemFormGroup.reset(nuevoItem.value); // Esto resetea a los valores iniciales del form group vacío
   }
  
    deleteItem(index: number) {
      this.items.removeAt(index);
      //this.updateTotals(); // Recalcular totales
    }
  
    updateSubtotal(index: number) {
      const itemFormGroup = this.items.at(index) as FormGroup;
      const importe = itemFormGroup.get('importe').value;
      const cantidad = itemFormGroup.get('cantidad').value;
      const bonificacion = itemFormGroup.get('bonificacion').value;
      const subtotal = (importe * cantidad) - bonificacion;
  
      const iva = subtotal * 0.21;
      itemFormGroup.patchValue({ subtotal, iva });
      //this.updateTotals(); // Recalcular totales
    }
  
    searchItems(event) {
      const query = event.query.trim();
  
      if (query.length < 3) {
        this.suggestions = [];
        return;
      }
  
      this.servicioRepuestosServicios.searchFilterRepServ(query).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((results: ItemDto[]) => of(results)),
        catchError(err => {
          console.error('Error en la búsqueda', err);
          return of([]);
        })
      ).subscribe((results: ItemDto[]) => {
        this.suggestions = results;
      });
      //const query = event.query.toLowerCase();
      //this.filteredItems = this.productos.filter(producto => producto.nombre.toLowerCase().includes(query));
    }
  
    abrirPopup(tipo: string, parametro?: string) {
      console.log('abrirPopup');
      this.mostrarPopup = true;
      this.datosService.cargarDatos(tipo, parametro).subscribe(
        (res) => {
          console.log('resultado abrirPopup', res);
          this.datos = res;
          this.popupService.mostrarPopup();
        },
        (error) => {
          console.error('Error al obtener datos:', error);
        }
      );
      
      
    }
  
    cerrarPopup() {
      
      this.popupService.cerarPopup();
    }
  
    itemSeleccionadoDesdePopup(itemSeleccionado: any) {
      console.log('1 Item seleccionado en el componente llamador:', itemSeleccionado);
      
      if (itemSeleccionado.item && itemSeleccionado.clase) {
        
        this.globalService.instanciarClasePorNombre(itemSeleccionado.clase, itemSeleccionado.item.Id);
  
        this.globalService.instanciarClasePorNombreObservable().subscribe((datos: any) => {
          console.log('Datos obtenidos:', datos);
  
          if (itemSeleccionado.clase === 'Cliente') {
            this.ordenForm.patchValue({
              cliente: {
                idCliente: datos.id,
                nombreCliente : datos.persona.razonSocial 
                                ? datos.persona.razonSocial : datos.persona.apellido + ', ' + datos.persona.nombre,
                direccionCliente: [
                  datos.persona.direccion,
                  datos.persona.nroDireccion, 
                  datos.persona.dpto, 
                  datos.persona.piso, 
                  datos.persona.barrio, 
                  datos.persona.localidad
                ].filter(val => val).join(' '),  // Concatenación con espacios entre valores existentes
                telefonoCliente: datos.persona.telfijo
              }
           
            });
          } else if (itemSeleccionado.clase === 'Empleado') {
            // Lógica similar para asignar datos de empleado
          } else if (itemSeleccionado.clase === 'Vehiculo') {
  
            this.ordenForm.patchValue({
              vehiculo: {
                patente : itemSeleccionado.item.patente.value,
                marca : itemSeleccionado.item.datos.marca,
                modelo : itemSeleccionado.item.datos.modelo,
                color : itemSeleccionado.item.datos.color,
                anio : itemSeleccionado.item.datos.anio,
                numeroserie : '123123123'
              }
            });
          }
        });
   
      }
    }
  
    
  
    onSelectItem(event, index) {
  
      const selectedItem = event;
      console.log('selectedItem: ', event);
      const itemFormGroup = this.items.at(index) as FormGroup;
      console.log('index: ', index);
      
      itemFormGroup.patchValue({
                                id: selectedItem.id,
                                precioUnitario: selectedItem.precioVenta,
                                tipo: selectedItem.tipo,
                                subtotal: this.calcularSubtotal(index)
                              });
      
                           
      
    }
  
  
  
    calcularSubtotal(index: number): number {
    
      const itemFormGroup = this.items.at(index) as FormGroup;
      if (!itemFormGroup) {
        console.warn(`No se encontró el FormGroup para el índice: ${index}`);
        return 0;
      }
      const importe  = itemFormGroup.get('precioUnitario').value;
      const cantidad = itemFormGroup.get('cantidad').value;
      let subtotal = importe * cantidad;
      itemFormGroup.get('subtotal').setValue(subtotal, { emitEvent: false });
      return (subtotal); 
      
    }
  
   
  
    // Métodos de cálculo del resumen
    calcularRepuestos(): number {
       console.log('calcularRepuestos: ', this.items.controls);
  
       this.totalRepuestos =  this.items.controls
        .filter((item: FormGroup, index: number) => index > 0)
         .filter((item: FormGroup) => item.get('tipo').value === 'Repuesto')
        .map((item: FormGroup) => Number(item.get('precioUnitario').value))
        .reduce((acc, val) => acc + val, 0);
  
         
    /*
      const asdasd= this.items.controls.filter((item: FormGroup, index: number) => index > 0)
                                               .filter((item: FormGroup) => item.get('tipo').value === 'Repuesto')
                                               .map((item: FormGroup) =>  item.get('subtotal').value)  
                                               .reduce((acc, val) => acc + val, 0)
                                               ;
      this.totalRepuestos = asdasd;     */
      return this.totalRepuestos;
  
    }
  
   
  
    calcularServicios(): number {
      this.totalServicios =  this.items.controls
        .filter((item: FormGroup, index: number) => index > 0)
        .filter((item: FormGroup) => item.get('tipo').value === 'Servicio')
        .map((item: FormGroup) => item.get('precioUnitario').value)
        .reduce((acc, val) => acc + val, 0);
  
        return this.totalServicios;
    }
  
    calcularBonificacionItems(): number {
      this.totalBonificacionItems =  this.items.controls
        .filter((item: FormGroup, index: number) => index > 0)
        .map((item: FormGroup) => Number(item.get('bonificacion').value))
        .reduce((acc, val) => acc + val, 0);
  
        return this.totalBonificacionItems;
    }
  
    calcularIVARepuestosYServicios(): number {
      this.totalIVA =  this.items.controls
        .filter((item: FormGroup, index: number) => index > 0)
        .map((item: FormGroup) => item.get('precioUnitario').value)
        .reduce((acc, val) => acc + val, 0);
      
      this.totalIVA = this.totalIVA * 0.21;
       
      return this.totalIVA;
    }
  
    recalcularTotalesYCampos() {
      console.log('entra a recalcularTotalesYCampos');
    for (let i = 0; i < this.items.length; i++) {
      this.calcularItem(i);
      this.calcularIVA(i);
    }
  
    this.calcularIVARepuestosYServicios();
    this.calcularBonificacionItems();
    this.calcularServicios();
    this.calcularRepuestos();
    //this.updateTotals()
  }
  
   /*
    updateTotals() {
      this.totalRepuestos = this.calcularRepuestos();
      this.totalServicios = this.calcularServicios();
      this.totalIVA = this.calcularIVARepuestosYServicios();
    }  */
  
    calcularTotalNeto(): number {
      return this.totalRepuestos + this.totalServicios;
    }
  
    calcularTotal(): number {
      this.ordenForm.value.montoTotal = this.calcularTotalNeto() + this.totalIVA ;
      return this.ordenForm.value.montoTotal;
    }
  
    calcularTotalPago(): number {
      let efectivo = +this.ordenForm.get('efectivo').value || 0;
      let cuentaCorriente = +this.ordenForm.get('cuentaCorriente').value || 0;
      let montoTarjetaCredito =  +this.ordenForm.get('montoTarjetaCredito').value || 0;
      let total = efectivo + cuentaCorriente + montoTarjetaCredito;
      return total;
    }
  
    calcularIVA(index: number): number {
      const subtotal = this.calcularSubtotal(index);
      return subtotal * 0.21;
    }
  
    calcularItem(index: number): number {
      const itemFormGroup = this.items.at(index) as FormGroup;
      if (!itemFormGroup) {
        console.warn(`No se encontró el FormGroup para el índice: ${index}`);
        return 0;
      }
      const bonificacion = itemFormGroup.get('bonificacion').value;
      return this.calcularSubtotal(index) -  bonificacion + this.calcularIVA(index);
    }
  
    protejerCampos(proteger: boolean ): void {
        this.camposReadOnly =  proteger;
    }
  
   
  
    
  
  }
  
  function getDataResumenCliente(cliente: Cliente): string {
      
      var resumenCliente;
  
      if (cliente) {
         resumenCliente = cliente.id + ' | ' +
                          ((cliente.persona.tipoPersona == 'F') 
                              ? cliente.persona.apellido + ", " + cliente.persona.nombre 
                              : cliente.persona.razonSocial) + ' | '  +
                           cliente.persona.telcelular;
                      
      };
  
      return resumenCliente;
    }
  
    function getDataResumenVehiculo(vehiculo: Vehiculo): string {
      
      var resumenVehiculo;
  
      if (vehiculo) {
         resumenVehiculo = vehiculo.id + ' | ' + 
                           vehiculo.modelovehiculo.marcavehiculo.nombre + ' - ' +  
                           vehiculo.modelovehiculo.nombreModelo + ' | ' + 
                           vehiculo.patente;
                      
      };
  
      return resumenVehiculo;
    }
  
    