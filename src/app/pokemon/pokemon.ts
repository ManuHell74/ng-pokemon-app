export class Pokemon {
    id: number;
    name: string;
    hp: number;
    cp: number;
    picture: string;
    types: string[];
    created: Date;

    // Ici, je déclare les valeurs par défaut du pokémon "vide"
    constructor(
        name: string = 'Entrer un nom...',
        hp: number = 100,
        cp: number = 10,
        picture: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png',
        types: string[] = ['Normal'],
        created: Date = new Date()
    ) {
        this.name = name;
        this.hp = hp;
        this.cp = cp;
        this.picture = picture;
        this.types = types;
        this.created = created;
    }
}