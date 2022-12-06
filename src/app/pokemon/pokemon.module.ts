// Sous-module

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { RouterModule, Routes } from '@angular/router';
import { pokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from "../auth.guard";

const pokemonRoutes: Routes = [

// les routes les plus spécifiques en haut et les plus globales en bas

// ici, on déclare des routes sous forme d'objets
// l'URL va matcher avec un composant, ça permet

  // Route 1
  { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [AuthGuard] },

  // Route 2
  {path: 'pokemon/add', component: AddPokemonComponent, canActivate: [AuthGuard] },
  
  // Route 3
  { path: 'pokemons', component: ListPokemonComponent, canActivate: [AuthGuard]},

  // ici, Angular sait qu'il doit recuperer l'ID grace à :
  // on précise le composant dans lequel il le met (DetailPokemonComponent)

  // Route 4
  { path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [AuthGuard]},



];

@NgModule({
  // je déclare les composants ici
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent

  ],
  imports: [
    CommonModule,

    FormsModule,

    // les routes filles sont déclarées ici: forChild
    RouterModule.forChild(pokemonRoutes)
  ],
  providers: [pokemonService]
})
export class PokemonModule { }
