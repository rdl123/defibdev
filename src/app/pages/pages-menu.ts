import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Calendrier',
    icon: 'layout-outline',
    link: '/pages/calendar',
    home: true
   
  },
  {
    title: 'Formulaires',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Ajouter client',
        link: '/pages/forms/inputs-client',
      },
      {
        title: 'Ajouter formateur',
        link: '/pages/forms/inputs-formateur',
      },
      {
        title: 'Ajouter Responsable',
        link: '/pages/forms/inputs-responsable',
      },
      {
        title: 'Ajouter Participant',
        link: '/pages/forms/inputs-participant',
      },
      {
        title: 'Ajouter formation',
        link: '/pages/forms/inputs-formation',
      },
      {
        title: 'Programmer une formation',
        link: '/pages/forms/inputs-subs',
      },
      
    ],
  },

  {
    title: 'Tableaux',
    icon: 'grid-outline',
    children: [
      {
        title: 'Clients',
        link: '/pages/tables/clients-list',
      },
      {
        title: 'Formateurs',
        link: '/pages/tables/formateur-list',
      },
      {
        title: 'Responsables',
        link: '/pages/tables/responsables-list',
      },
      {
        title: 'Participants',
        link: '/pages/tables/participant-list',
      },
      {
        title: 'Formations disponibles',
        link: '/pages/tables/formations-list',
      },
      
      {
        title: 'Formations programmées',
        link: '/pages/tables/subscriptions-list',
      },
    ],
  }
    ]
