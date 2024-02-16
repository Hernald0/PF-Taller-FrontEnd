// contenido-popup.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopUpDatosService } from '../../../components/servicios/pop-up-datos.service';

@Component({
  selector: 'app-contenido-popup',
  template: `
  <p-table [value]="datos">  
    <ng-template pTemplate="header">
        <tr>
            <th class="text-right">#ID</th>
            <th>Nombre/Razon Social</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-datos>
        <tr (dblclick)="seleccionarItem(datos)">
          <td class="text-right">{{datos.id}}</td>
          <td>{{datos.nombre}}  </td>
        </tr>
    </ng-template>
  </p-table>
  `,
})
export class ContenidoPopupComponent implements OnInit {
  @Input() tipoPopUp: string;
  @Output() itemSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  datos: any[] = [];

  constructor(private datosService: PopUpDatosService) {}

  ngOnInit() {
    this.datosService.datos$.subscribe((contenido) => {
      this.datos = contenido;
    });
    
    /*console.log('ContenidoPopupComponent: ' + this.tipoPopUp);
    this.datosService.datos$.subscribe((datos) => {
      this.datos = datos;
    });*/

    if (this.tipoPopUp) {
      this.datosService.cargarDatos(this.tipoPopUp);
    }
  }

  seleccionarItem( itemSelecionado: any): void {
    console.log('valor:' , itemSelecionado);
     // Emitir el item seleccionado para que el popup-generico lo reciba
    this.itemSeleccionado.emit(itemSelecionado);
  }
}
