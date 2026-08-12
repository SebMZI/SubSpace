import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { deactivateAuthGuard } from './deactivate-auth-guard';

describe('deactivateAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => deactivateAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
