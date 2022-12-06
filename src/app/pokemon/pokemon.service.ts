import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable(
  // providedIn: 'root'
  // grace à root, on fournie le service dans toute l'application
)
export class pokemonService {

  constructor (private http: HttpClient) { }


  // renvoie une liste de pokémon

  // j'importe l'observable depuis RxJs
  getPokemonList(): Observable<Pokemon[]> { // Objet

    // je retourne un flux qui contient des pokémons
    // recupere les pokemon et les mets dans un tableau depuis l'api/pokemon
    // je fais une requete http get et je reçois un observable
    //la reponse contient une liste de pokemon
    return this.http.get<Pokemon[]>('api/pokemons').pipe(

      // je log la reponse
      // tap : opérateur RxJs (comme un console.log)
      tap((response) => this.log(response)),

      // quand j'ai une erreur, je la log
      // catcheError : intercepte les erreurs
      catchError((error) => this.handleError(error, []))
      
      // console.log(error);
        // plutot que le crash, on retourne un tableau vide
      // return of([]);
  );
    
  }

  // Undefined : si un pokémon demandé ne correspond pas
  getPokemonById(pokemonId:number): Observable<Pokemon|undefined> {

      return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(

    
      tap((response) => this.log(response)),

      
      catchError((error) =>  this.handleError(error, undefined))

      );

  // ici , la fonction de retour
  // return POKEMONS.find(pokemon => pokemon.id == pokemonId)

  }

  // methode pour le champs de recherche de pokemon
  searchPokemonList(term: string): Observable<Pokemon[]> {
    if(term.length <= 1) {
      return of([]);
    } 

    // pour chaque terme de recherche je retourne la réponse du serveur
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      
      // en cas d'erreur sur la recherche, je renvoie un tableau vide
      catchError((error) => this.handleError(error, []))
    );
  }

  //  prend en parametre un pokémon et sauvegarde les modifs sur le serveur, et on le récupère à jour sur la base de données
  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      // je log la réponse
      tap((response) => this.log(response)),
      // j'intercepte l'erreur et je la passe dans ma methode handleError
      catchError((error) => this.handleError(error, null))
    );
  }

  // permet d'ajouter un pokemon
  // on transmet tout un objet côté serveur
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // la methode post ajoute la ressource sur le serveur
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  // permet de supprimer un pokemon 
  deletePokemonById(pokemonId: number): Observable<null> {

    // le service fera la suppression côté serveur
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  private log(response: any) {

    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {

    console.error(error);

    // le of permet de transformer 
    return of(errorValue);
  }

  // ici, on renvoie un tableau de chaine de caractere qui contient tous les types de pokemon demandé
  getPokemonTypeList(): string[] {

    return [
    'Plante',
    'Feu',
    'Eau',
    'Insecte',
    'Normal',
    'Electrik',
    'Poison',
    'Fée',
    'Vol',
    'Combat',
    'Psy']

  }

}
