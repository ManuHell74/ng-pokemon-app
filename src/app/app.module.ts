// Module racine du projet, ou on importe les composants

import { NgModule } from '@angular/core'; // on l'utilise à la ligne 9 
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { InMemoryDataService } from './in-memory-data.service';
import { LoginComponent } from './login/login.component';
// import { InMemoryDbService } from 'angular-in-memory-web-api';


@NgModule({
  declarations: [ // ici on déclare nos composants
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [ // permet de déclarer les éléments que l'on a besoin dans notre module
  //ce sont aussi d'autres modules
    BrowserModule,
    
    FormsModule,

    HttpClientModule,

    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false}),

    // ici, je relie le fils au app.module.ts
    PokemonModule,
    
    AppRoutingModule

    
  ],
  providers: [], // injection de dépendance d'Angular
  bootstrap: [AppComponent] // composant racine, est chargé en premier
})
export class AppModule { }
