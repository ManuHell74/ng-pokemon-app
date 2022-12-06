import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { pokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html'
  
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];

  // si le pokemon n'est pas trouvé dans l'URL, le pokemon vaudra par défaut undefined
  pokemon: Pokemon| undefined;

  //  on pilote/importe les routes ici, dans le constructeur
  //  on rend disponible le routeur dans le composant/constructeur
  // permet d'accéder à l'ID de l'URL 
  constructor(
    private route: ActivatedRoute, 
    private router: Router,

    // ici,j'injecte le pokemonService
    private pokemonService: pokemonService
    ) { }

  ngOnInit() {
    

    // ici, je récupère l'id contenu dans l'URL
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');


    // si pockemon id n'est pas à null, s'il est bien définie
    // qu'il a bien été trouvé donc :
    if (pokemonId) {
      // on attribue le pokemon ici
      

    this.pokemonService.getPokemonById(+pokemonId)
    
    // je recupère un pokemon en parametre, et je l'affecte à ma propriété this.pokemon
        .subscribe(pokemon => this.pokemon = pokemon);
    } 
  }

  // methode qui permet de supprimer un pokémon
  deletePokemon(pokemon: Pokemon) {
    // j'appelle le pokemonService et je lui dit de supprimer le pokemon par son ID
    this.pokemonService.deletePokemonById(pokemon.id)
    // une fois que le pokemon est supprimé, je renvoi l'utilisateur à la page principale
      .subscribe(() => this.goToPokemonList());
  }

  
  goToPokemonList() {
    // cette méthode me ramène sur la liste de pokemon quand je clique sur le bouton retour, c'est une redirection

    
      // ici, je fais appel au router et à sa propriété navigate
      this.router.navigate(['/pokemons'])
      // en parametre, je fais appel à l'Url DANS UN TABLEAU

    }

    // redirige au click sur le formulaire du pokémon
  goToEditPokemon(pokemon:Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id])
  }

}
 