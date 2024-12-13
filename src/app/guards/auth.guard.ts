import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.validateToken().pipe(
      map((isValid: boolean) => {
        if (isValid) {
          return true; // Token is valid, allow access
        } else {
          this.router.navigate(['/auth/login']); // Redirect to login if token invalid
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/auth/login']); // Redirect on error
        return [false];
      })
    );
  }
}
