import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const userExclusiveGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  if (authService.isUser()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

export const adminExclusieGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  if (authService.isAdmin()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
