import { Component, OnInit } from '@angular/core';

/**
 * Generated class for the FunFactsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fun-facts',
  templateUrl: 'fun-facts.html'
})
export class FunFactsComponent implements OnInit {

  public facts: string[] = [
    `Le plus long match de tennis est de 11 heures et 5 minutes. Ce match opposait l'américain John Isner et le français Nicolas Mahut.
    Au final, le gagnant du match était John Isner avec un score de 6-4, 3-6, 6-7, (7-9), 7-6(7-3), 70-68 pour le dernier set.`,
    `Le tennis est également un sport olympique et il peut être joué sur des fauteuils roulants.`,
    `On pense que le tennis a pris naissance dans les cloîtres monastiques du nord de la France au 12ème siècle. Fait intéressant, la balle a ensuite été frappé avec la paume de la main. À cette époque, il s'appelait «jeu de paume». Les raquettes sont entrées en usage au 16ème siècle.`,
    `Le mot «Tennis» vient du terme anglo-normand «Tenez».`,
    `Wimbledon, ou les championnats de Wimbledon, est le plus ancien tournoi de tennis au monde et est également considéré comme le plus prestigieux.`,
    `Le premier Wimbledon a été joué en 1877. C'est aussi le premier des quatre «Grand Chelem» à être fondé.`,
    `L'US Open a été fondé en 1881, les Français en 1891 et l'Australie en 1905. Ces quatre tournois majeurs ont été désignés comme tournois de «Grand Chelem».`,
    `Un joueur aurait gagné une carrière dans le Grand Chelem s’il remportait les quatre tournois majeurs à tout moment de sa carrière; un Grand Chelem sans année civile s'ils remportent les quatre tournois majeurs consécutivement, mais pas la même année, et un Grand Chelem s'ils gagnent les quatre tournois majeurs en une seule année.`,
    `La Coupe Davis date de 1900. C’est une compétition annuelle entre les équipes nationales masculines.`,
    `Saviez-vous que la Fed Cup, qui est une compétition analogue pour les équipes nationales féminines, a été fondée en 1963 pour fêter le 50e anniversaire de la ITF?`,
    `L’année 1968 marque le début de l’ère ouverte du tennis professionnel. Le French Open a été le premier événement «Grand Chelem» à s'ouvrir.`,
    `Saviez-vous que le tie-break a été inventé par James Van Alen en 1965?`,
    `À l'origine, deux types de départages ont été introduits dans le jeu par Van Alen. Celui qui se terminerait après un maximum de 9 points s'appelait «le bris d'égalité pour la mort subite», tandis que celui qui comptait 12 points s'appelait le «bris d'égalité de la mort persistante». Le jeu décisif de 12 points continue jusqu’à ce qu’un joueur ou une équipe gagne avec une marge d’au moins deux points et avec un minimum de 7 points.`,
    `La coupe Davis a d'abord adopté le bris d'égalité dans tous les sets, sauf le dernier set en 1989, et a modifié ses règles pour adopter les bris d'égalité des cinq sets en 2016.`,
    `1971 - le départage a été introduit à Wimbledon.`,
    `L'US Open est le seul tournoi majeur à utiliser un jeu décisif dans le dernier set pour les simples.`,
    `Don Budge est le seul joueur de l'histoire du tennis à avoir remporté six titres consécutifs en simple du Grand Chelem, de Wimbledon en 1937 à l'US Open en 1938.`,
    `Le service le plus rapide dans le tennis masculin est venu de la raquette de l’australien Sam Groth à 263,44 km / h.`,
    `L’Allemande Sabine Lisicki a réussi un service de 210 km / h, la plus rapide jamais enregistrée dans le tennis féminin.`,
    `En 2007, les gains des gagnants de Wimbledon sont devenus égaux pour les hommes et les femmes.`,
    `Le terme «Amour» utilisé dans le système de notation du tennis proviendrait du mot français «œuf», l’œuf, car un zéro sur un tableau de bord ressemble à un œuf. Cependant, ces affirmations ne sont pas fondées.`,
    `Chez les hommes, Roger Federer a remporté 20 titres en simple du Grand Chelem (jusqu'au 28 janvier 2018), tandis que du côté féminin, Margaret Court compte 24 majeurs.`,
    `Saviez-vous que si la balle frappe le corps d’un joueur ou une partie de son vêtement avant qu’elle atterrisse, c’est le point de leur adversaire (même si elle s’est éteinte)?`,
    `Arthur Ashe a été le premier Afro-Américain à remporter l’ouverture américaine. Il a remporté le tournoi pour la première et unique fois en 1968. Il a déclaré:

    “Commence où tu es. Utilisez ce que vous avez. Fais ce que tu peux."`,
    `L'âge moyen des garçons et filles de ballon qui servent à Wimbledon est de 15 ans. Chaque année, 250 de ces jeunes enfants sont sélectionnés pour servir lors du tournoi.`,
    `Rufus - un Harris Hawk - est en poste à Wimbledon pour que son ciel soit dégagé des pigeons locaux. Croiriez-vous que ce faucon compte 5000 abonnés sur Twitter?`,
    `Les joueurs doivent soumettre leurs vêtements au All England Lawn Tennis and Croquet Club pour approbation avant de participer aux championnats de Wimbledon.`,
    `Le jeu de tennis est également devenu une raison indirecte de la mort du roi Jacques Ier d’Écosse.`,
    `Chaque année, 24 tonnes de fraises sont consommées à Wimbledon.`,
    `Dans les premières années de Wimbledon, les femmes portaient des robes longues.`,
    `Roger Federer a inscrit 10 099 as à ce jour, ce qui le place à la troisième place de la liste des as, tandis qu'Ivo Karlovic est en tête du classement avec 12.196 as.`,
    `Roger Federer est à la tête de tous les joueurs de tennis masculins en termes de plus gros prix en carrière. Il avait collecté 107 780 560 dollars américains au 28 août 2017.`,
    `1972 est l'année de la création de l'Association des professionnels du tennis.`,
    `Selon la Fédération internationale de tennis, le poids d'une balle de tennis doit être compris entre 56,0 et 59,4 grammes.`,
    `Les balles de tennis étaient blanches à l’origine. En 1986, les balles jaunes ont été introduites pour la première fois à Wimbledon.`,
    `La longueur totale autorisée d'une raquette de tennis est de 29 pouces.`,
    `Au début, les courts de tennis étaient en forme de sablier. Les tribunaux rectangulaires existent depuis 1875.`,
    `Un court de tennis standard mesure 27 pieds de large (pour les célibataires) et 78 pieds de long. Le filet mesure 3 pieds 6 pouces de hauteur. Pour les doubles, la largeur est de 36 pieds tandis que la longueur reste la même.`,
    `L'argile, le dur, le verre, la moquette et le bois sont les cinq types de terrains utilisés dans le tennis professionnel.`,
    `À Wimbledon, l’herbe est coupée à une hauteur d’exactement 8 mm pendant l’événement.`,
    `On estime que 54 250 balles de tennis sont utilisées pendant le tournoi de Wimbledon.`,
    `Goran Ivanisevic est le seul gagnant de Wimbledon dont le nom alterne consonnes et voyelles.`,
    `Boris Becker est le plus jeune joueur à avoir remporté un titre à Wimbledon. Il est également le seul joueur non classé de l'histoire à remporter ce titre prestigieux. Il avait 17 ans en 1985 quand il l'a remporté.`,
    `Le match de tennis le plus court n'a duré que 20 minutes. Il a été joué entre Susan Tutt et Marion Bandy en 1969 à Wimbledon.`,
    `Le stade de Roland-Garros, qui accueille l’Open de France, porte le nom d’un aviateur français - Roland Garros.`,
    `Le trophée du vainqueur à Wimbledon reste exposé au musée du All England Club, car les gagnants ne prennent pas leur trophée avec eux. Cependant, ils reçoivent de petites copies des trophées officiels.`,
    `La coupe en or remise au vainqueur masculin remonte à 1887, tandis que le trophée attribué aux femmes, appelé «salver», remonte à 1864.`,
    `Le tanking est un terme dans le tennis qui signifie perdre un match ou le "réparer" pour un bénéfice quelconque.`,
    `Le coude de tennis est une inflammation des tendons qui rejoignent les muscles de l'avant-bras à l'extérieur du coude.`,
    `Le grunt le plus fort, qui a atteint 105 décibels, est venu de Maria Sharapova en 2009 à Wimbledon.`,
    `Les premières sœurs à remporter une médaille d’or olympique au tennis ont été Venus et Serena Williams.`,
    `Les Jeux olympiques ont introduit le tennis en 1896 et l'ont supprimé en 1924. Cependant, le tennis a été réintroduit aux Jeux olympiques de 1988 et continue de faire partie des jeux à ce jour.`
  ]

  public displayedFact: string = '';

  constructor() {

  }

  ngOnInit(): void {
    this.displayAnotherFact();
  }

  public displayAnotherFact(): void {
    const max: number = this.facts.length;
    const min: number = 0;
    const rand: number = Math.floor(Math.random() * (+max - +min)) + +min; 
    this.displayedFact = this.facts[rand];
  }

}
