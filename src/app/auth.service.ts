import { Injectable } from '@angular/core';
// RxJS 6
import { delay, Observable, of, tap } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // j'ai besoin de cette variable pour savoir si l'utilisateur est connecté ou non
    isLoggedIn: boolean = false; // L'utilisateur est-il connecté ?
    redirectUrl: string; // où rediriger l'utilisateur après l'authentification ?
    // Une méthode de connexion
    login(name: string, password: string): Observable<boolean> {
        // Faites votre appel à un service d'authentification...
        const isLoggedIn = (name == 'pikachu' && password == 'pikachu');
  
        return of(isLoggedIn).pipe(
          // je simule un delay de connexion grace à RxJS:
            delay(1000),
            // tap récupère isLoggedIn
            tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
        );
    }
  
    // Une méthode de déconnexion
    logout() {
    this.isLoggedIn = false;
  }
}

//  c'est ce service qui nous prouve qu'il a les bons identifiants