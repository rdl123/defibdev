import { TestBed } from '@angular/core/testing';

import { ResponsableService } from './responsable.service';

describe('FormateurService', () => {
  let service: ResponsableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
