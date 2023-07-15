import { ManageEventsComponent } from './components/content/manage-events/manage-events.component';
import { LoginGuard } from './services/login-guard.service';
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

const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'add-event', component: AddEditEventComponent, canActivate: [LoginGuard] },
  { path: 'edit-event', component: AddEditEventComponent, canActivate: [LoginGuard] },
  { path: 'manage-events', component: ManageEventsComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'personas', component: PersonaListComponent },
  { path: 'aseguradoras', component: AseguradoraComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'estadocivil', component: EstadocivilComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'talleres', component: TalleresComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: 'modelos/:marcaId', component: ModelosComponent },
  { path: 'generos', component: GenerosComponent },
  { path: 'tipoidentificador', component: TipoidentificadorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'events' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
