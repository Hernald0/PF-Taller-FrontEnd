import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppPrimeNgModule } from 'src/app/app.primeng.module';
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
    MarcamodeloModule
  ]
})
export class ComponentsModule { }