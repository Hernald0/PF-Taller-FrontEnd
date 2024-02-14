// popup.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private mostrarPopupFuente = new Subject<boolean>();
  private contenidoPopupFuente = new Subject<any>();

  mostrarPopup$ = this.mostrarPopupFuente.asObservable();
  contenidoPopup$ = this.contenidoPopupFuente.asObservable();

  mostrarPopup() {
    this.mostrarPopupFuente.next(true);
  }

  cerarPopup() {
    this.mostrarPopupFuente.next(false);
  }

  actualizarContenidoPopup(contenido: any) {
    console.log( 'actualizarContenidoPopup') 
    console.log(contenido);
    this.contenidoPopupFuente.next(contenido);
  }
}
