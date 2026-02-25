import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { exclusiveGuard } from './exclusive-guard';

describe('exclusiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => exclusiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
