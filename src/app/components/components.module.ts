import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppPrimeNgModule } from 'src/app/app.primeng.module';
import { DialogModule } from 'primeng/dialog';
//import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DropdownModule} from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { ClientesComponent } from './clientes/clientes.component';
import { AseguradoraComponent } from './aseguradora/aseguradora.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { TalleresComponent } from './talleres/talleres.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { MarcamodeloModule } from './marcamodelo/marcamodelo.module';
import { EstadocivilComponent } from './estadocivil/estadocivil.component';
import { GenerosComponent } from './generos/generos.component';
import { TipoidentificadorComponent } from './tipoidentificador/tipoidentificador.component';
import { CotizadorComponent } from '../components/cotizador/cotizador.component';
//import { CotizadorModule } from './cotizador/cotizador.module';
import { ContenidoPopupComponent } from './popups/contenido-popup/contenido-popup.component';
import { PopupGenericoComponent } from './popups/popup-generico/popup-generico.component';




@NgModule({
  declarations: [
    ClientesComponent,
    AseguradoraComponent,
    DashboardComponent,
    EmpleadosComponent,
    ServiciosComponent,
    ClientesComponent,
    VehiculosComponent,
    TalleresComponent,
    EstadocivilComponent,
    GenerosComponent,
    TipoidentificadorComponent,
    PopupGenericoComponent,
    ContenidoPopupComponent,
    CotizadorComponent
  ],
  imports: [
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    AppPrimeNgModule,
    AutoCompleteModule,
    RadioButtonModule,
    DropdownModule,
    MarcamodeloModule,
    //CotizadorModule
  ],
  exports:[ PopupGenericoComponent,
            ContenidoPopupComponent]
})
export class ComponentsModule { }
