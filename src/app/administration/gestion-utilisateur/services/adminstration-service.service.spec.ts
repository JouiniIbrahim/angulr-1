import { TestBed } from '@angular/core/testing';

import { AdminstrationServiceService } from './adminstration-service.service';

describe('AdminstrationServiceService', () => {
  let service: AdminstrationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminstrationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
