import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppPrimeNgModule } from 'src/app/app.primeng.module';
//import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
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
import { PopupGenericoComponent } from './popups/popup-generico/popup-generico.component';
import { ClientevehiculosComponent } from './clientevehiculos/clientevehiculos.component';
import { TurnoComponent } from './turno/turno.component';
import { StepsModule } from 'primeng/steps';
import { CheckboxModule } from 'primeng/checkbox';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { ScheduleComponent } from './schedule/schedule.component';
import { TurnosdashboardComponent } from './turnosdashboard/turnosdashboard.component';
import { RecepcionvehiculoComponent } from './recepcionvehiculo/recepcionvehiculo.component';
import { VentasComponent } from './ventas/ventas.component';
import { OrdenComponent } from './orden/orden.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AccordionModule } from 'primeng/accordion';
import { AdminVentasComponent } from './admin-ventas/admin-ventas.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component'; 
import { ProgressBarModule } from 'primeng/progressbar';



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
    CotizadorComponent,
    ClientevehiculosComponent,
    TurnoComponent,
    ScheduleComponent,
    TurnosdashboardComponent,
    RecepcionvehiculoComponent,
    VentasComponent,
    OrdenComponent,
    UsuariosComponent,
    AdminVentasComponent,
    AdminOrdersComponent
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
    ListboxModule,
    StepsModule,
    CheckboxModule,
    FullCalendarModule,
    AccordionModule,
    ProgressBarModule
 
    //CotizadorModule
  ],
  exports:[ PopupGenericoComponent]
})
export class ComponentsModule { }
