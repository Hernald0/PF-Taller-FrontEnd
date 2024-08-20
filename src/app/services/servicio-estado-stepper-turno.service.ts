import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioEstadoStepperTurnoService{
  private clienteSubject = new BehaviorSubject<any>(null);
  private vehiculoSubject = new BehaviorSubject<any>(null);
  private motivoSubject = new BehaviorSubject<any>(null);
  private serviciosSubject = new BehaviorSubject<any>([]);
  private fechaSubject = new BehaviorSubject<any>(null);

  cliente$ = this.clienteSubject.asObservable();
  vehiculo$ = this.vehiculoSubject.asObservable();
  motivo$ = this.motivoSubject.asObservable();
  servicios$ = this.serviciosSubject.asObservable();
  fecha$ = this.fechaSubject.asObservable();

  setCliente(cliente: any) {
    this.clienteSubject.next(cliente);
  }

  setVehiculo(vehiculo: any) {	
    this.vehiculoSubject.next(vehiculo);
  }

  setMotivo(motivo: any) {
    this.motivoSubject.next(motivo);
  }

  setServicios(servicios: any[]) {
    this.serviciosSubject.next(servicios);
  }

  setFecha(fecha: any) {
    this.fechaSubject.next(fecha);
  }
}