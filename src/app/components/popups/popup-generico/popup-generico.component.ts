// popup-generico.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() itemSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  
  mostrarPopup: boolean = false;
  contenidoPopup: any;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    console.log('PopupGenericoComponent: ' + this.tipoPopUp );
    this.popupService.mostrarPopup$.subscribe((mostrar) => {
      this.mostrarPopup = mostrar;
    });

  
  }

  seleccionarItem(item: any): void {
    
    this.itemSeleccionado.emit(item);
 
    this.cerrarPopup();
  
  }

  cerrarPopup() {
    
    this.mostrarPopup = false;
  
  }
}