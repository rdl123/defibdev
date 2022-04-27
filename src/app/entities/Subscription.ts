
import { Categorie } from './Categorie';
import { Formateur } from './Formateur';
import { Formation } from './Formation';
import { Responsable } from './Responsable';

export class Subscription { 
    date_debut : string;
    date_fin : string;
    description : string;
    client : Categorie;
    formateur : Formateur;
    formation : Formation;
    responsable : Responsable;
    isConfirmed : string;
  
   }






	


