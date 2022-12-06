import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.auth = this.authService;
  }

    // Informe l'utilisateur sur son authentfication.
  setMessage() {
    if(this.auth.isLoggedIn) {
      this.message = 'Vous êtes connecté.';
    } else {
      this.message = 'Identifiant ou mot de passe incorrect.'
    }
  }

    // Connecte l'utilisateur auprès du Guard
  login() {
    this.message = 'Tentative de connexion en cours...';
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if(isLoggedIn) {
          // Récupère l'URL de redirection depuis le service d'authentification
                // Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
                // Redirige l'utilisateur vers la liste de pokemons
          this.router.navigate(['/pokemons']);
        } else {

          // réinitialise le Mot de passe en cas d'erreur
          this.password = '';
          this.router.navigate(['/login']);
        }
      })
  }

  logout() {
    this.auth.logout();
    this.message = 'Vous êtes déconnecté.';
  }

}
