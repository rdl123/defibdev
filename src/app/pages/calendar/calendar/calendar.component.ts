import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { blockData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel, View, GroupModel, TimelineViewsService, TimelineMonthService, DayService,
  ResizeService, DragAndDropService, ResourceDetails, ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';
import { SubscriptionService } from '../../../services/SubscriptionService/subscription.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class CalendarComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  listsubscriptions: any;
  public selectedDate: Date = new Date(2021, 7, 2);
  public currentView: View = 'TimelineDay';
  public colorsList = ['#bbdc00', '#9e5fff', '#bbdc00', '#9e5fff', '#bbdc00', '#9e5fff'];
  dummydata: Record<string, any>[] = [{
    Id: 5,
    Subject: 'Dummy test',
    StartTime: new Date(2021, 7, 11, 11, 0),
    EndTime: new Date(2021, 7, 13, 10, 0),
    IsAllDay: false,
    EmployeeId: 2

  }]

  public data: Record<string, any>[] = extend([], this.dummydata, null, true) as Record<string, any>[];
  public colorIndex = 0;
  public employeeDataSource: Record<string, any>[] = [
    { Text: 'Alice', Id: 1, Color: '#bbdc00', Designation: 'Content writer' },
    { Text: 'Nancy', Id: 2, Color: '#9e5fff', Designation: 'Designer' },
    { Text: 'Robert', Id: 3, Color: '#bbdc00', Designation: 'Software Engineer' },
    { Text: 'Robson', Id: 4, Color: '#9e5fff', Designation: 'Support Engineer' },
    { Text: 'Laura', Id: 5, Color: '#bbdc00', Designation: 'Human Resource' },
    { Text: 'Margaret', Id: 6, Color: '#9e5fff', Designation: 'Content Analyst' }
  ];
  public group: GroupModel = { enableCompactView: false, resources: ['Employee'] };
  public allowMultiple = false;
  public eventSettings: EventSettingsModel = { dataSource: this.data };

  constructor(private subscriptionService: SubscriptionService) {
    this.eventSettings.allowAdding = false;
    this.eventSettings.allowEditing = false;
    this.eventSettings.allowDeleting = false;
    this.subscriptionService.findAllSubscriptions().subscribe(data => {
      this.listsubscriptions = data;
      this.employeeDataSource = this.formatEmployee(this.listsubscriptions);
      for (let key in this.formatEvents(this.listsubscriptions)) {
        this.data.push(this.formatEvents(this.listsubscriptions)[key] as Record<string, any>[]);
      }
      // this.data.push(this.formatEvents(this.listsubscriptions) as Record<string, any>[]);
      this.eventSettings.dataSource = this.data;
      console.log(this.eventSettings.dataSource);


    })

  }


  public formatEmployee(obj: any) {
    const newArr = [];
    var elm = {};
    var _contains;
    for (let key in obj) {
      if (obj[key]) {
        elm = {
          Text: obj[key].formateur.nom,
          Id: obj[key].formateur.id,
          color: '#bbdc00'
        }
        _contains = newArr.indexOf(elm)
        newArr.push(elm);

      }
    }
    let uniqueArray = [];
    uniqueArray = newArr.filter((obj, pos, arr) => {
      return arr
        .map(mapObj => mapObj.name)
        .indexOf(obj.name) == pos;
    });
    return uniqueArray;

  }

  public formatEvents(obj: any) {
    const newArr = [];
    var elm = {};
    var _contains;
    for (let key in obj) {
      if (obj[key]) {
        elm = {
          Id: obj[key].id,
          Subject: obj[key].formation.nom,
          // StartTime: new Date(obj[key].date_debut),
          // EndTime: new Date(obj[key].date_fin),
          StartTime: new Date(2021, 7, 2, 11, 0),
          EndTime: new Date(2021, 7, 4, 10, 0),
          IsAllDay: false,
          EmployeeId: obj[key].formateur.id
        }
        newArr.push(elm);

      }
    }
    return newArr;

  }

  public getEmployeeName(value: ResourceDetails): string {
    return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
  }

  public getEmployeeDesignation(value: ResourceDetails): string {
    const resourceName: string = (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
    return (value as ResourceDetails).resourceData.Designation as string;
  }

  public getEmployeeImageName(value: ResourceDetails): string {
    return this.getEmployeeName(value).toLowerCase();
  }

}
