import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../components/servicios/pop-up.service';
import { PopUpDatosService } from '../servicios/pop-up-datos.service';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {

  mostrarPopup: boolean = false;
  datos: any[] = [];
  //columnas: { nombre: string, tipo: string }[] = [
    // Define las columnas según tus necesidades
  //];

  constructor(private popupService: PopupService,
              private datosService: PopUpDatosService) 
  { }

  ngOnInit(): void {
    this.datosService.datos$.subscribe((contenido) => {
      this.datos = contenido;
    });
  }

  abrirPopup(tipo: string) {
    this.mostrarPopup = true;
    this.popupService.actualizarContenidoPopup(this.datosService.cargarDatos(tipo));
    this.popupService.mostrarPopup();
  }

  cerrarPopup() {
    
    this.popupService.cerarPopup();
  }

  itemSeleccionadoDesdePopup(item: any) {
    console.log('Item seleccionado en el componente llamador:', item);

    // Realizar acciones adicionales según sea necesario
  }
}
