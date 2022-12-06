import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    
    // demande au authService si la prporiété isLoggedIn vaut TRUE 
    if(this.authService.isLoggedIn) {
      return true;
    }

    // on redirige l'utilisateur sur le login et on retourne false
    this.router.navigate(['/login']);
    return false;
  }
}
