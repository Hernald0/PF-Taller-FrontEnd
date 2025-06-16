import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { ItemDto } from 'src/app/models/ItemDto.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { PopupService } from '../servicios/pop-up.service';
import { PopUpDatosService } from '../servicios/pop-up-datos.service';
import { GlobalService } from 'src/app/services/global.service';
import { subtractDurations } from '@fullcalendar/core/datelib/duration';
import { Location } from '@angular/common';
import { VentaService } from 'src/app/services/venta.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Params } from '@angular/router';
import { Venta } from 'src/app/models/venta.model';
import { VentaDetalle } from 'src/app/models/ventaDetalle.model';
//import { ChangeDetectorRef } from '@angular/core';
 


@Component({
  selector: 'app-venta',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'] // Cambia esto si está en OnPush
})
export class VentasComponent implements OnInit {
  ventaId: number = null;
  ventaForm: FormGroup;
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
  ventaRecuperada : Venta;

  constructor(private fb: FormBuilder,
              private servicioRepuestosServicios: ServiciosService,
              private popupService: PopupService,
              private datosService: PopUpDatosService,
              private globalService: GlobalService,
              private ventaService: VentaService,
              private _location: Location,
               private rutaActiva: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
             // private cdr: ChangeDetectorRef
              
  ) {
    }

   goBack(){
    this._location.back();
  }

  ngOnInit() {

    this.ventaId = this.rutaActiva.snapshot.params.ventaId;
  
    this.rutaActiva.params.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (params: Params) => {
          this.ventaId = params.ventaId;
        }
      );

    this.ventaForm = this.fb.group({

                                    fechaEmision: [new Date(), Validators.required],
                                    usuario: ['UsuarioLogueado', Validators.required],
                                    cliente: this.fb.group({
                                            idCliente: [''], 
                                            nombreCliente: [''], 
                                            telefonoCliente: [''], 
                                            direccionCliente: ['']

                                          }),
                                    items: this.fb.array([]), //new FormArray([]),                                     
                                    descuento: [0],
                                    efectivo: [0],
                                    montoTotal:[],
                                    nrooperacion : [],
                                    cuentaCorriente: [0],
                                    tarjetaCredito: [null],
                                    montoTarjetaCredito:  [{ value: '', disabled: true }] ,
                                    observaciones: [''],
                                   
                                  });

    
  
    this.items = this.ventaForm.get('items') as FormArray;
    

    this.ventaForm.get('tarjetaCredito')!.valueChanges.subscribe(value => {
      if (value) {
        this.ventaForm.get('montoTarjetaCredito')!.enable();
      } else {
        this.ventaForm.get('montoTarjetaCredito')!.disable();
      }
    });

 
    console.log('1');
      
    if (this.ventaId) {
      
      // Se está editando una venta existente
      this.ventaService.getVenta(this.ventaId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(res => {
                          this.ventaRecuperada = res as Venta;
                          console.log('this.ventaRecuperada', this.ventaRecuperada);
                          this.ventaForm.patchValue({
                                                      fechaEmision:new Date(this.ventaRecuperada.fechaEmision),
                                                      usuario: this.ventaRecuperada.usuario,
                                                      items:  this.ventaRecuperada.items,
                                                      cliente: {
                                                        idCliente: this.ventaRecuperada.cliente.id,
                                                        nombreCliente: this.ventaRecuperada.cliente.persona.nombre,
                                                        telefonoCliente: this.ventaRecuperada.cliente.persona.telcelular,
                                                        direccionCliente: this.ventaRecuperada.cliente.persona.direccion
                                                      }, 
                                                      descuento: this.ventaRecuperada.descuento,
                                                      efectivo: this.ventaRecuperada.efectivo,
                                                      montoTotal: this.ventaRecuperada.montoTotal,
                                                      nrooperacion: this.ventaRecuperada.nrooperacion,
                                                      cuentaCorriente: this.ventaRecuperada.cuentaCorriente,
                                                      tarjetaCredito: this.ventaRecuperada.tarjetaCredito,
                                                      montoTarjetaCredito: this.ventaRecuperada.montoTarjetaCredito,
                                                      observaciones: this.ventaRecuperada.observaciones 
                          });
    
        this.items.clear();

        console.log(this.ventaRecuperada.items);

        this.ventaRecuperada.items.forEach(detalle => {
          this.items.push(this.createItemFromDetalle(detalle));
        }); 

      });
    } else {
      // Nueva venta
      this.items.push(this.createItem());
    } 

  }

  createItemFromDetalle(detalle: VentaDetalle): FormGroup {
    
    console.log('imprime el item',detalle )
   
    return this.fb.group({
     
      id: [detalle.Id || null],
      tipo: [detalle.tipo || null],
      cantidad: [detalle.cantidad || 0 ],
      precioUnitario: [detalle.precioUnitario || 0],
      iva: [detalle.iva || 0],
      bonificacion: [detalle.bonificacion || 0],
      producto: [detalle|| null],  //  este campo es necesario para el HTML
      importe:  [detalle.importe || null],
      subtotal:  [detalle.subtotal || null]
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      producto: ['', Validators.required],
      importe: [0, Validators.required],
      cantidad: [1, Validators.required],
      tipo: ['', Validators.required],
      bonificacion: [0],
      subtotal: [0],
      iva: [0]
    });
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
         importe: itemFormGroup.get('importe').value, 
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
/*
  updateSubtotal(index: number) {
    const itemFormGroup = this.items.at(index) as FormGroup;
    const importe = itemFormGroup.get('importe').value;
    const cantidad = itemFormGroup.get('cantidad').value;
    const bonificacion = itemFormGroup.get('bonificacion').value;
    const subtotal = (importe * cantidad) - bonificacion;
    const iva = subtotal * 0.21;
    itemFormGroup.patchValue({ subtotal, iva });
    this.updateTotals(); // Recalcular totales
  }*/

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
          this.ventaForm.patchValue({
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
        }
        else if (itemSeleccionado.clase === 'Vehiculo') {
        /*  this.formularioCotizacion.patchValue({ 

            patente : datos.
            marca
            modelo
            color
            anio
            numeroserie
          
          });*/
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
                              importe: selectedItem.precioVenta,
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
    const importe = itemFormGroup.get('importe').value;
    const cantidad = itemFormGroup.get('cantidad').value;
  
    return (importe * cantidad); 
    
  }

 

  // Métodos de cálculo del resumen
  calcularRepuestos(): number {
    console.log('cantidad de items',this.items.length );
    console.log('cantidad de items',this.items.controls
      .filter((item: FormGroup) => item.get('tipo').value === 'Repuesto') );
    this.totalRepuestos =  this.items.controls
      .filter((item: FormGroup) => item.get('tipo').value === 'Repuesto')
      .map((item: FormGroup) => item.get('subtotal').value)
      .reduce((acc, val) => acc + val, 0);

      return this.totalRepuestos;
  }

  calcularServicios(): number {
    this.totalServicios =  this.items.controls
      .filter((item: FormGroup) => item.get('tipo').value === 'Servicio')
      .map((item: FormGroup) => item.get('subtotal').value)
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
      .map((item: FormGroup) => item.get('iva').value)
      .reduce((acc, val) => acc + val, 0);
    
    return this.totalIVA;
  }


  /*
  updateTotals() {
    this.totalRepuestos = this.calcularRepuestos();
    this.totalServicios = this.calcularServicios();
    this.totalIVA = this.calcularIVARepuestosYServicios();
  }*/

  calcularTotalNeto(): number {
    return this.totalRepuestos + this.totalServicios;
  }

  calcularTotal(): number {
    this.ventaForm.value.montoTotal = this.calcularTotalNeto() + this.totalIVA - this.ventaForm.controls['descuento'].value;
    return this.ventaForm.value.montoTotal;
  }

  calcularTotalPago(): number {
    let efectivo = +this.ventaForm.get('efectivo').value || 0;
    let cuentaCorriente = +this.ventaForm.get('cuentaCorriente').value || 0;
    let montoTarjetaCredito =  +this.ventaForm.get('montoTarjetaCredito').value || 0;
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

  validarDatosRequeridos(): boolean {
    
    
  console.log('ID Cliente:', this.ventaForm.value.cliente.idCliente);
  console.log('Cantidad de Items:', this.ventaForm.value.items.length);
  
  // Si idCliente es nulo o el listado es menor o igual a un registro, devuelve true
  const resultado = this.ventaForm.value.cliente.idCliente == null || 
                    this.ventaForm.value.items.length <= 1;

  console.log('Resultado lógico:', resultado);

    return resultado;
  }

  validarSumaTotal(): boolean {
    if (this.ventaForm.value.montoTotal !=  this.calcularTotalPago() ) 
          
      { this.displayDialog = true;
        return ;  }
    
   
  }

  submitVenta(accion : string)
  {

    

    if ( this.validarDatosRequeridos() ) 
    {

      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Completar datos requeridos.' 
    })
      return;
    
    }
    

    let itemsFiltrados = this.ventaForm.value.items
                          .filter((item: any) => item.id !== "")
                          .map((item: any) => ({
                            itemId: item.producto.id,
                            cantidad: item.cantidad,
                            bonificacion: item.bonificacion,
                            tipo: item.producto.tipo,
                            importe: item.producto.importe,
                            iva: item.producto.iva,
                            subtotal: item.producto.subtotal,
                          }));
                          
     let tipoOperacion = (accion == 'guardar') ?  'presupuesto' : 'venta';
                        
     let payload = { 
          //...this.ventaForm.value,
          //items: this.ventaForm.value.items.filter((item: any) => item.id !== "")
          fechaEmision: this.ventaForm.value.fechaEmision,
          vendedor: this.ventaForm.value.vendedor,
          clienteId: this.ventaForm.value.cliente.idCliente,
          items: itemsFiltrados,
          descuento: parseFloat(this.ventaForm.value.descuento),
          efectivo: parseFloat(this.ventaForm.value.efectivo),
          montoTotal: parseFloat(this.ventaForm.value.montoTotal),
          tarjetaCredito: this.ventaForm.value.tarjetaCredito,
          montoTarjetaCredito: this.ventaForm.value.montoTarjetaCredito,
          cuentaCorriente: this.ventaForm.value.cuentaCorriente,
          observaciones: this.ventaForm.value.observaciones,
          usuario: this.ventaForm.value.usuario,
          tipoOperacion: tipoOperacion
    };
  
    let mensaje;
    
    console.log('Se llamó enviarVenta',payload);
   
    this.ventaService.postVenta(payload).subscribe({
      next: (res) => { 
          console.log('Respuesta backend:', res);
          
          if (tipoOperacion == 'venta')  
               {
                this.protejerCampos(true);
               this.ventaForm.disable(); 
                mensaje = 'Quedó confirmada la Venta: Nro. "' + res.NroVenta }
               else
               {
                mensaje = 'Quedó confirmado el Presupuesto: Nro. "' + res.id
               }
               
                this.messageService.add({severity:'success', 
                                          detail: mensaje  })
                                        },
     
              error: (err) => { console.error('Error en POST:', err),
                                  this.messageService.add({ 
                                    severity: 'error', 
                                    summary: 'Error', 
                                    detail: 'Se produjo el error: ' + err 
                                }) }
    });

  }

}
