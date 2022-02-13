import { TestBed } from '@angular/core/testing';

import { MailSchedulerService } from './mail-scheduler.service';

describe('MailSchedulerService', () => {
  let service: MailSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
