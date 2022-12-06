import { Component } from "@angular/core";
// import { POKEMONS } from "./mock-pokemon-list"; // importe la liste de pokémon depuis le fichier 
// import { Pokemon } from "./pokemon/pokemon";

@Component({
  selector: "app-root", // ici, on définie la balise html
  
  // ici, cest une vue 
  // templateUrl permet d'appeler le HTML depuis un fichier Html
  templateUrl: 'app.component.html',
})

// on implemente ici l'interface OnInit:
export class AppComponent  {
  
  // pokemonSelected: Pokemon | undefined;


  // void : on ne renvoie rien
  // ngOnInit() { // associé à l'interface OnInit, toujours !
  // console.table(this.pokemonList); // affiche un tableau
  
  // }

  // selectPokemon(pokemonId: number) { // methode
  //   // Quand l'utilisateur clique dessus mon template, ça exécute ca:

  //   const id = +pokemonId;
  //   const pokemon: Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId);
  //   if (pokemon) {
  //     console.log(`Vous avez demandé le pokémon ${pokemon.name}`);
  //     this.pokemonSelected = pokemon;
  //   }
  //   else {
  //      console.log(`Vous avez demandé un pokémon qui n'existe pas`);
  //     this.pokemonSelected = pokemon;
  //   }
    
    
    
  // }
}


// Exercices: ajouter 3 nouvelles instructions:
// - modifier le template du composant pour afficher le message "liste de pokémon"
// - Au niveau de pokemonList, Charger la liste des 12 pokemons plutot que 3 pokemons
// - Au niveau de la methode selectPokemon, toujours afficher le nom d'un pokemon dans le console.log mais en parametre afficher directement un pokemon qui provient de la liste mock-pokemon-list.ts