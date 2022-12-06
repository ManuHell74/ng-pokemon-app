import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { pokemonService } from "../pokemon.service";

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  
})
export class ListPokemonComponent implements OnInit {

  pokemonList: Pokemon []; //permet d'exporter le composant pour le rendre disponible hors de l'application (comme dans le fichier app.module.ts)

  constructor(
    // Cette syntaxe injecte un service !!
    private router: Router,

    private pokemonService: pokemonService
    // je tape private, je donne un nom à mon instance (router),


    ) { 

  }

  // ici, on récupère la pokemonList de manière synchrone
  // ngOnInit(){
  //   this.pokemonList = this.pokemonService.getPokemonList();
  // }
  
  ngOnInit() {
    // je récupère un Observable depuis mon service
    this.pokemonService.getPokemonList()
    //ensuite, je m'abonne et je recupère la pokemonList et la pousse dans le composant
      .subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);

  }

}
