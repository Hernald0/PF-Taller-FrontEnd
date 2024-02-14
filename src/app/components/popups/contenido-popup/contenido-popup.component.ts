// contenido-popup.component.ts
import { Component, Input, OnInit } from '@angular/core';
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
        <tr>
          <td class="text-right">{{datos.id}}</td>
          <td>{{datos.nombre}}  </td>
             
        </tr>
    </ng-template>
  </p-table>
  `,
})
export class ContenidoPopupComponent implements OnInit {
  @Input() tipoPopUp: string;
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
}
