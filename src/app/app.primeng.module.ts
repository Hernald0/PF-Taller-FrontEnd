import { NgModule } from "@angular/core";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
//import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    //InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    CalendarModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    MessageModule,
    ProgressSpinnerModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    //InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    CalendarModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    MessageModule
  ]
})
export class AppPrimeNgModule{

}
