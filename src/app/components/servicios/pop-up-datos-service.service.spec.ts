import { TestBed } from '@angular/core/testing';

import { PopUpDatosServiceService } from './pop-up-datos-service.service';

describe('PopUpDatosServiceService', () => {
  let service: PopUpDatosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpDatosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
