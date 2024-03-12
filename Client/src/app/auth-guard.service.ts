import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router:Router, private authService:AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (state.url === '/login' || state.url === '/register' || state.url === '/forgot-password') {
      // If the user is already logged in, redirect them to the dashboard
      if (this.authService.isLoggedIn()) {
        return this.router.parseUrl('/dashboard');
      }
      return true; // Allow access to login, register, and forgot password routes if the user is not logged in
    } else {
      // If the user is not logged in, redirect them to the login page
      if (!this.authService.isLoggedIn()) {
        return this.router.parseUrl('/login');
      }
      // Allow access to the dashboard route if the user is logged in
      return true;
    }
  }
}
