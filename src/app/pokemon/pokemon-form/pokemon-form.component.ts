import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { pokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})

// un composant outil pour ajouter ou editer des pokemons
export class PokemonFormComponent implements OnInit {

  // on dis au reste de l'application qu'on veux un pokemon en propriété losqu'elle appelle un formulaire
  @Input() pokemon: Pokemon;

  types: string[];

  isAddForm : boolean;

  constructor(
    private pokemonService: pokemonService,
    private router: Router
    ) {


   }

  ngOnInit() {
    // on veut la liste de pokemon
    // j'initialise la string du types avec le composant pokemonService
    this.types = this.pokemonService.getPokemonTypeList( );

    // S'il renvoie true, je j'ajoute sinon je modifie un pokemon
    this.isAddForm = this.router.url.includes('add');

  }

  // permet de précocher le type Feu pour le pokemon Salamèche par exemple
  // si le pokemon a ce type, il me renvoie true ou false
  hasType(type: string):boolean {

    // est-ce que le pokemon a un type comme le parametre
    return this.pokemon.types.includes(type);

  }

  // permet de sélectionner le type / d'enlever / ajouter le type Feu, eau etc...
  selectType($event: Event, type: string) {

    //je récupère l'info si l'utilisateur à coché ou non au niveau de l'event du Dom
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      // ajoute le type utilisateur dans le tableau de type du pokemon courant
      this.pokemon.types.push(type);
    } else {
      // s'il a décoché je retire le type
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  //methode si le type de pokemon est valide
  isTypesValid(type:string): boolean {

    // en cas d'erreur :
    // si le pokemon en cours a comme type une longueur égale à 1 on va bloquer la case en question
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;


    }
    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }



    return true;

  }

  // lorsque l'utilisateur soumet le formulaire, cette methode s'applique
  onSubmit() {

    // il faut distinguer les 2 cas : ajout ou modif de pokemon
    if(this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
    .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id]));
    } else {
       // ici, on modifie le pokemon
    this.pokemonService.updatePokemon(this.pokemon)
    
    .subscribe(() => { this.router.navigate(['/pokemon', this.pokemon.id]);
      
    });
      
    }
    

   
  }
    
    

    // console.log('le formulaire à été soumis !');

// this.router.navigate(['/pokemon', this.pokemon.id]);

  }


