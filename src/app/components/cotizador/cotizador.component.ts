import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../components/servicios/pop-up.service';
import { PopUpDatosService } from '../servicios/pop-up-datos.service';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {

  showClientePopup:  boolean; 
  showVehiculoePopup: boolean; 
  mostrarPopup: boolean = false;
  
  constructor(private popupService: PopupService,
              private datosService: PopUpDatosService) 
  { }

  ngOnInit(): void {
    /*
    this.showClientePopup= false;
    this.showVehiculoePopup=false;
    */
  }

  abrirPopup(tipo: string) {
    this.mostrarPopup = true;
    this.popupService.actualizarContenidoPopup(this.datosService.cargarDatos(tipo));
    this.popupService.mostrarPopup();
  }

  cerrarPopup() {
    //this.mostrarPopup = false;
    this.popupService.cerarPopup();
  }

  itemSeleccionadoDesdePopup(item: any) {
    console.log('Item seleccionado en el componente llamador:', item);
  
    // Realizar acciones adicionales según sea necesario
  }
}
