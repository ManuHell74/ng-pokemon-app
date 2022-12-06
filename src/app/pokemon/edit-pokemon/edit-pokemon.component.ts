import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { pokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
  <!-- si le pokemon est undefined, j'utilise ? pour ne rien afficher -->
  <h2 class="center">Editer {{ pokemon?.name }}</h2>
    <!-- ngIf : on affiche l'image que s'il y a un pokemon -->
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture">
    </p>
    <app-pokemon-form  *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit {

  // je travaille avec la propriété pokemon de type Pokemon
  pokemon: Pokemon | undefined;

  constructor(
    // je recupere l'id dans la route
    // 2 injections:
    private route: ActivatedRoute,
    private pokemonService: pokemonService
    ) { 
    
  }

  ngOnInit() {

    //  je recupere l'id du pokemon depuis l'url
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    if (pokemonId)  {
      // je vais chercher le pokemon associé
      this.pokemonService.getPokemonById(+pokemonId)
    
    // je recupère un pokemon en parametre, et je l'affecte à ma propriété this.pokemon
        .subscribe(pokemon => this.pokemon = pokemon);
      
    }
    else {
      // s'il n'y en a pas , undefined
      this.pokemon = undefined;
    }
  }

}
