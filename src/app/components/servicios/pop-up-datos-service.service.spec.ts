import { TestBed } from '@angular/core/testing';

import { PopUpDatosService } from './pop-up-datos.service';

describe('PopUpDatosServiceService', () => {
  let service: PopUpDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
