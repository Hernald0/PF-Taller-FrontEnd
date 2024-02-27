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
  @Input() mostrarPopup: boolean;
  @Input() datos: any;     
  @Output() itemSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  
 
  contenidoPopup: any;
 
  constructor(private popupService: PopupService) {}

  ngOnInit() {
    
   
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

  getColumnas() {
    if (this.datos && this.datos.columnas) {
      console.log(Object.keys(this.datos.columnas));
      return Object.keys(this.datos.columnas);
    }
    return [];
  }

  obtenerValor(dato: any, columna: string): any {
    try {
      return dato[columna];
    } catch (error) {
      console.error(`Error al obtener el valor para la columna ${columna}: ${error.message}`);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrar un valor predeterminado o un mensaje de error.
      return 'Error';
    }
  }
  
}