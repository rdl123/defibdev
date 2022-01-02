
import { Categorie } from './Categorie';
import { Formateur } from './Formateur';
import { Formation } from './Formation';

export class Subscription { 
    id :number;
    date_debut : string;
    date_fin : Date;
    description : string;
    client : Categorie;
    formateur : Formateur;
    formation : Formation;
  
   }






	


