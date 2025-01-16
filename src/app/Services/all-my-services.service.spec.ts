import { TestBed } from '@angular/core/testing';

import { AllMyServicesService } from './all-my-services.service';

describe('AllMyServicesService', () => {
  let service: AllMyServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllMyServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
