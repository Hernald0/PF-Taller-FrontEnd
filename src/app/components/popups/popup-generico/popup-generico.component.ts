// popup-generico.component.ts
import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../servicios/pop-up.service';
//import {ComponentsModule} from '../../components.module';

@Component({
  selector: 'app-popup-generico',
  templateUrl: './popup-generico.component.html',
  styleUrls: ['./popup-generico.component.css'],
  //providers: [ComponentsModule],
})
export class PopupGenericoComponent implements OnInit {
  mostrarPopup: boolean = false;
  contenidoPopup: any;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popupService.mostrarPopup$.subscribe((mostrar) => {
      this.mostrarPopup = mostrar;
    });

    this.popupService.contenidoPopup$.subscribe((contenido) => {
      this.contenidoPopup = contenido;
    });
  }

  cerrarPopup() {
    this.mostrarPopup = false;
    // Puedes agregar lógica adicional aquí si es necesario
  }
}