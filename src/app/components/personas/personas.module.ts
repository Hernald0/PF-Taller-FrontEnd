import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonaAddUpdateComponent } from './persona-add-update/persona-add-update.component';
import { PersonaListComponent } from './persona-list/persona-list.component';


@NgModule({
  declarations: [PersonaAddUpdateComponent, PersonaListComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PersonasModule { }
