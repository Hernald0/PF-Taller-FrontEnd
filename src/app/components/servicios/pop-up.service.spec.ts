import { TestBed } from '@angular/core/testing';

import { PopUpService } from './pop-up-service.service';

describe('PopUpServiceService', () => {
  let service: PopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
