import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from '../calendar/calendar/calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';

import { ToastAllModule } from '@syncfusion/ej2-angular-notifications';

import { DropDownButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';

import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';

import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonAllModule, CheckBoxAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    CalendarRoutingModule,
    FlatpickrModule.forRoot(),
    ScheduleAllModule, RecurrenceEditorAllModule,  
     NumericTextBoxAllModule, TextBoxAllModule,
      DatePickerAllModule, TimePickerAllModule, 
      DateTimePickerAllModule, CheckBoxAllModule,  
       ToolbarAllModule, DropDownListAllModule, 
       ContextMenuAllModule, MaskedTextBoxModule, 
       UploaderAllModule, MultiSelectAllModule,   
       TreeViewModule, ButtonAllModule, DropDownButtonAllModule, 
       SwitchAllModule, ToastAllModule

  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}