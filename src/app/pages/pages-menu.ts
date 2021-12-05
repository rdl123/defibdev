import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Formulaires',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Ajouter client',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Ajouter formateur',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Ajouter formation',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Programmer une formation',
        link: '/pages/forms/inputs',
      },
      
    ],
  },

  {
    title: 'Tableaux',
    icon: 'grid-outline',
    children: [
      {
        title: 'Clients',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Formateurs',
        link: '/pages/tables/tree-grid',
      },
      {
        title: 'Formations disponibles',
        link: '/pages/tables/tree-grid',
      },
      {
        title: 'Formations programmées',
        link: '/pages/tables/tree-grid',
      }
    ],
  }
    ]
