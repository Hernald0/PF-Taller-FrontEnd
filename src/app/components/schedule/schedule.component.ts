import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  step = 1;
  customer = {
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    email: 'john.doe@example.com',
    personType: 'fisica',
    identifierType: 'dni',
    identifierNumber: '12345678',
    vehicles: [
      { patente: 'ABC123', marca: 'Toyota', modelo: 'Corolla' },
      { patente: 'XYZ789', marca: 'Honda', modelo: 'Civic' }
    ]
  };
  existingCustomer = true;
  selectedVehicle = { patente: 'ABC123', marca: 'Toyota', modelo: 'Corolla' };
  reason = 'Mantenimiento';
  reasonDetail = 'Revisión general';
  predefinedReasons = ['Mantenimiento', 'Reparación', 'Consulta General'];
  services = [
    { id: 1, name: 'Cambio de Aceite', selected: true },
    { id: 2, name: 'Revisión de Frenos', selected: false },
    { id: 3, name: 'Alineación', selected: false }
  ];
  selectedServices = [];
  appointmentDate: Date = new Date();
  appointmentTime = '10:00';
  availableTimeSlots = [];
  selectedServicesNames: string;
  minDate: Date;
  maxDate: Date;
  disabledDates: Date[];
  disabledDays: number[];

  ngOnInit() {
    this.updateSelectedServicesNames();
    this.configureCalendar();
    this.setupDummyData();
  }

  nextStep() {
    if (this.step === 1 && this.existingCustomer) {
      // Validar y recuperar datos del cliente y vehículo
    } else if (this.step === 3) {
      this.selectedServices = this.services.filter(s => s.selected);
      this.updateSelectedServicesNames();
    } else if (this.step === 4) {
      this.generateTimeSlots();
    }
    this.step++;
  }

  confirm() {
    // Lógica para confirmar la reserva y enviar el correo
  }

  edit() {
    this.step--;
  }

  selectVehicle(vehicle) {
    this.selectedVehicle = vehicle;
  }

  addNewVehicle() {
    this.selectedVehicle = { patente: '', marca: '', modelo: '' };
  }

  generateTimeSlots() {
    const slots = [];
    const start = new Date();
    start.setHours(9, 0, 0, 0);
    const end = new Date();
    end.setHours(18, 0, 0, 0);
    while (start < end) {
      slots.push(start.toTimeString().substr(0, 5));
      start.setMinutes(start.getMinutes() + 30);
    }
    this.availableTimeSlots = slots;
  }

  updateSelectedServicesNames() {
    this.selectedServicesNames = this.selectedServices.map(s => s.name).join(', ');
  }

  configureCalendar() {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 2); // Permitimos citas con hasta 2 meses de antelación
    
    this.disabledDates = [
      new Date('2024-01-01'),
      new Date('2024-05-01'),
      // Añade más fechas de feriados aquí
    ];
    
    this.disabledDays = [0]; // 0 representa los domingos
  }

  setupDummyData() {
    // Configuración de datos ficticios para pruebas
    this.customer = {
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '0987654321',
      email: 'jane.doe@example.com',
      personType: 'fisica',
      identifierType: 'dni',
      identifierNumber: '87654321',
      vehicles: [
        { patente: 'DEF456', marca: 'Ford', modelo: 'Fiesta' },
        { patente: 'GHI012', marca: 'Chevrolet', modelo: 'Spark' }
      ]
    };
    this.existingCustomer = true;
    this.selectedVehicle = this.customer.vehicles[0];
    this.reason = 'Reparación';
    this.reasonDetail = 'Cambio de frenos';
    this.services = [
      { id: 1, name: 'Cambio de Aceite', selected: false },
      { id: 2, name: 'Revisión de Frenos', selected: true },
      { id: 3, name: 'Alineación', selected: false }
    ];
    this.selectedServices = this.services.filter(s => s.selected);
    this.updateSelectedServicesNames();
    this.appointmentDate = new Date();
    this.appointmentTime = '11:00';
    this.generateTimeSlots();
  }
}
