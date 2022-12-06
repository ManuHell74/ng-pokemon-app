import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { pokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {

  // propriété qui est le flux des recherches de l'utilisateur
  searchTerms = new Subject<string>();

  // Observable : Flux
  // 
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: pokemonService
    ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}

      // attend qu'il y ai un changement dans les termes de recherches
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {.....pokemonList(ab)............pokemonList(abc)......}
    );
  }


  // prend un terme en parametre
  // methode qui renvoi les termes demandé par l'utilisateur
  search(term: string) {

    // next : comme Push mais avec un flux de données
    this.searchTerms.next(term);
  }

  // quand l'utilisateur cliquera sur un champs de recherche, ça le redirige sur le résultat qu'il cliquera
  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
