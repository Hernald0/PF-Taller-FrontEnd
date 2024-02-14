import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import {PopupClienteComponent} from  '../../components/popups/popup-cliente/popup-cliente.component';
import {PopupVehiculoComponent} from  '../../components/popups/popup-vehiculo/popup-vehiculo.component';
import {CotizadorComponent} from '../cotizador/cotizador.component';
import { DialogModule } from 'primeng/dialog';
//import { PopupGenericoComponent } from '../../components/popups/popup-generico/popup-generico.component';
//import {ContenidoPopupComponent} from '../../components/popups/contenido-popup/contenido-popup.component'; 
//import {ComponentsModule} from '../components.module';

@NgModule({
  declarations: [ 
 
    PopupClienteComponent,
    PopupVehiculoComponent,
    CotizadorComponent,
    //PopupGenericoComponent,
    //ContenidoPopupComponent
  ],
  imports: [
    CommonModule,
    //ComponentsModule,
    DialogModule, // Asegúrate de incluir DialogModule aquí
  ]
})
export class CotizadorModule { }
