import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoComponent } from '../demo/demo/demo.component';
import { DemoRoutingModule } from './demo-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    DemoRoutingModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  declarations: [DemoComponent],
  exports: [DemoComponent],
})
export class DemoModule {}