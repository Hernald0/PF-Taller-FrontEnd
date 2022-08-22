import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasComponent } from './marcas/marcas.component';
import { ModelosComponent } from './modelos/modelos.component';
import { AppPrimeNgModule } from 'src/app/app.primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [MarcasComponent, ModelosComponent],
  imports: [
    CommonModule,
    AppPrimeNgModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MarcamodeloModule { }
