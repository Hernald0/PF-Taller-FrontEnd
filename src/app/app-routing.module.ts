import { ManageEventsComponent } from './components/content/manage-events/manage-events.component';
//import { LoginGuard } from './services/login-guard.service';
import { AuthGuard } from './components/auth/auth.guard';
//import { AuthService } from './services/auth2.service';
import { LoginComponent } from './components/login/login.component';
import { AddEditEventComponent } from './components/content/add-edit-event/add-edit-event.component';
import { EventsComponent } from './components/content/events/events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaListComponent } from './components/personas/persona-list/persona-list.component';
import { AseguradoraComponent } from './components/aseguradora/aseguradora.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { TalleresComponent } from './components/talleres/talleres.component';
import { MarcasComponent } from './components/marcamodelo/marcas/marcas.component';
import { ModelosComponent } from './components/marcamodelo/modelos/modelos.component';
import { EstadocivilComponent } from './components/estadocivil/estadocivil.component';
import { GenerosComponent } from './components/generos/generos.component';
import { TipoidentificadorComponent } from './components/tipoidentificador/tipoidentificador.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { ClientevehiculosComponent } from './components/clientevehiculos/clientevehiculos.component';
import { TurnoComponent } from './components/turno/turno.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TurnosdashboardComponent } from './components/turnosdashboard/turnosdashboard.component';
import { OrdenComponent } from './components/orden/orden.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RecepcionvehiculoComponent } from './components/recepcionvehiculo/recepcionvehiculo.component';
import { AdminVentasComponent } from './components/admin-ventas/admin-ventas.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

const routes: Routes = [
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard]  },
  { path: 'add-event', component: AddEditEventComponent, canActivate: [AuthGuard] },
  { path: 'edit-event', component: AddEditEventComponent, canActivate: [AuthGuard] },
  { path: 'manage-events', component: ManageEventsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]  },
  { path: 'personas', component: PersonaListComponent, canActivate: [AuthGuard]  },
  { path: 'aseguradoras', component: AseguradoraComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard]  },
  { path: 'estadocivil', component: EstadocivilComponent, canActivate: [AuthGuard]  },
  { path: 'servicios', component: ServiciosComponent, canActivate: [AuthGuard]  },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]  },
  { path: 'clientevehiculos/:clienteId', component: ClientevehiculosComponent , canActivate: [AuthGuard] },
  { path: 'vehiculos', component: VehiculosComponent , canActivate: [AuthGuard] },
  { path: 'talleres', component: TalleresComponent, canActivate: [AuthGuard]  },
  { path: 'marcas', component: MarcasComponent, canActivate: [AuthGuard]  },
  { path: 'modelos/:marcaId', component: ModelosComponent , canActivate: [AuthGuard] },
  { path: 'generos', component: GenerosComponent, canActivate: [AuthGuard]  },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] }, 
  { path: 'turno', component: TurnoComponent, canActivate: [AuthGuard] },
  { path: 'turnosdashboard', component: TurnosdashboardComponent, canActivate: [AuthGuard] },
  { path: 'recepcionvehiculo/:turnoId', component: RecepcionvehiculoComponent, canActivate: [AuthGuard] },
  { path: 'cotizador', component: CotizadorComponent, canActivate: [AuthGuard]  },
  { path: 'tipoidentificador', component: TipoidentificadorComponent, canActivate: [AuthGuard]  },
  { path: 'admin-ventas', component: AdminVentasComponent, canActivate: [AuthGuard]  },
  { path: 'venta/:ventaId', component: VentasComponent, canActivate: [AuthGuard]  },
  { path: 'venta', component: VentasComponent, canActivate: [AuthGuard]  },
  { path: 'orden', component: OrdenComponent, canActivate: [AuthGuard]  },
  { path: 'orden/:orderId', component: OrdenComponent, canActivate: [AuthGuard]  },
  { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard]  },
  
  { path: '**', pathMatch: 'full', redirectTo: 'tipoidentificador' },
  //{ path: '', redirectTo: '/events', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
