import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormInputsFormationComponent } from './form-inputs-formation/form-inputs-formation.component';
import { FormInputsSubsComponent } from './form-inputs-subs/form-inputs-subs.component';
import { FormInputsFormateurComponent } from './form-inputs-formateur/form-inputs-formateur.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: 'inputs-client',
        component: FormInputsComponent,
      },
      {
        path: 'inputs-formation',
        component: FormInputsFormationComponent,
      },
      {
        path: 'inputs-formateur',
        component: FormInputsFormateurComponent,
      },
      {
        path: 'inputs-subs',
        component: FormInputsSubsComponent,
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
      },
      {
        path: 'datepicker',
        component: DatepickerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class FormsRoutingModule {
}

