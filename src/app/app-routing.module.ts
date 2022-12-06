import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

// les routes les plus spécifiques en haut et les plus globales en bas



  // route 3
  // redirige l'utilisateur vers la page de login
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},

  // route 4
  { path: '**', component: PageNotFoundComponent}

];

@NgModule({

  // les routes racines sont déclarées ici: forRoot
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
