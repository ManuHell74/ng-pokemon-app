import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // ici, le selecteur pkmnBorderCard est utilisé dans le HTML pour appeler la directive
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
// ici, la directive est annoncée

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;


  //  ici, j'ajoute un élément el de type ElementRef
    constructor(private el:ElementRef) { 
    // ElementRef est une référence vers l'élément/les cartes du Dom 

    // ici j'appelle mes methodes en leur donnant des parametres
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
    }

    @Input('pkmnBorderCard') borderColor: string; //alias
    // @Input() pkmnBorderCard: string; // sans alias

    @HostListener('mouseenter') onMouseEnter() {
      // au passage de la souris on change ici la couleur de la bordure
      // on utilise la methode setBorder pour définir une couleur par défaut et || si elle n'est pas définie
      this.setBorder(this.borderColor || this.defaultColor);

    }
    @HostListener('mouseleave') onMouseLeave() {
      // quand la souris s'en va on change ici la couleur de la bordure
      this.setBorder(this.initialColor);

    }

    private setBorder(color: string) {
      let border = 'solid 4px' + color;
      this.el.nativeElement.style.border = border;
    }

    // ici, je définie une methode setHeight pour modifier la taille des vignettes
    // elle prend en parametre une hauteur de type number
    setHeight(height:number) {
      
      // je définie la hauteur de l'ElementRef en pixel
    this.el.nativeElement.style.height = `${height}px`;

    }

    // ici, je définie une methode setBorder pour modifier les bordures des vignettes
    // elle prend en parametre une couleur de type string
    // setBorder(color:string) {

    // // je définie la couleur de l'ElementRef en pixel
    // this.el.nativeElement.style.border = `solid 4px ${color}`;

    // }

}
