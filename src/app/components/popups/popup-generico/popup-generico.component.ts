// popup-generico.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { PopupService } from '../../servicios/pop-up.service';
//import {ComponentsModule} from '../../components.module';

@Component({
  selector: 'app-popup-generico',
  templateUrl: './popup-generico.component.html',
  styleUrls: ['./popup-generico.component.css'],
  //providers: [ComponentsModule],
})
export class PopupGenericoComponent implements OnInit {
  @Input() tipoPopUp: string;
  @Input() mostrarContenido: boolean;
  
  mostrarPopup: boolean = false;
  contenidoPopup: any;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    console.log('PopupGenericoComponent: ' + this.tipoPopUp );
    this.popupService.mostrarPopup$.subscribe((mostrar) => {
      this.mostrarPopup = mostrar;
    });

  
  }

  cerrarPopup() {
    this.mostrarPopup = false;
    // Puedes agregar lógica adicional aquí si es necesario
  }
}