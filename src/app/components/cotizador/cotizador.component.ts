import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../components/servicios/pop-up.service';
import { PopUpDatosService } from '../servicios/pop-up-datos.service';
import { Cliente } from 'src/app/models/cliente.model';
import { Empleado } from 'src/app/models/empleado.model';
import { Modelovehiculo } from 'src/app/models/modelovehiculo.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {

  mostrarPopup: boolean = false;
  datos: any[] = [];
  cliente: Cliente;
  empleado: Empleado;
  
  //columnas: { nombre: string, tipo: string }[] = [
    // Define las columnas según tus necesidades
  //];

  constructor(private popupService: PopupService,
              private datosService: PopUpDatosService,
              private clientesService: ClientesService) 
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

    if (typeof item === 'object' && item !== null) {
      // Realizar comprobaciones de tipo según las clases conocidas
      if (item instanceof Cliente) {
        console.log('Es una instancia de Cliente:', item);
        // Casting a Cliente
        const clienteTemp: Cliente = item as Cliente;
        console.log('Es una instancia de Cliente:', clienteTemp);
 
            this.clientesService.getCliente(clienteTemp.id).subscribe(res => {     
              // console.log('recupera todas las clientes');
              // console.log(res); 
               this.cliente = res;       
               
              }); 
      } else if (item instanceof Modelovehiculo) {
        console.log('Es una instancia de Modelovehiculo:', item);
      } else if (item instanceof Empleado) {
        console.log('Es una instancia de Modelovehiculo:', item);
      } else {
        console.log('Es un objeto genérico:', item);
      }
    }
  
  }
}
