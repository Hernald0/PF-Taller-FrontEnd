import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { PersonaAddUpdateComponent } from './persona-add-update/persona-add-update.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { AppPrimeNgModule } from 'src/app/app.primeng.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DropdownModule} from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [PersonaAddUpdateComponent, PersonaListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule ,
    AppPrimeNgModule,
    ProgressSpinnerModule,
    DropdownModule,
    RadioButtonModule,
    AutoCompleteModule
  ]
})
export class PersonasModule { }
