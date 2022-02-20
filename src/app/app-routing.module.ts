import { ManageEventsComponent } from './components/content/manage-events/manage-events.component';
import { LoginGuard } from './services/login-guard.service';
import { LoginComponent } from './components/login/login.component';
import { AddEditEventComponent } from './components/content/add-edit-event/add-edit-event.component';
import { EventsComponent } from './components/content/events/events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaListComponent } from './components/personas/persona-list/persona-list.component';

const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'add-event', component: AddEditEventComponent, canActivate: [LoginGuard] },
  { path: 'edit-event', component: AddEditEventComponent, canActivate: [LoginGuard] },
  { path: 'manage-events', component: ManageEventsComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'personas', component: PersonaListComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'events' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
