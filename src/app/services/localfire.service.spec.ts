import { TestBed } from '@angular/core/testing';

import { LocalfireService } from './localfire.service';

describe('LocalfireService', () => {
  let service: LocalfireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalfireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
