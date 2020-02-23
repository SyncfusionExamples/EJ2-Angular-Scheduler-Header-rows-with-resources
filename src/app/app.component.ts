import { Component } from '@angular/core';
import {
    ScheduleComponent, EventSettingsModel, View, TimelineMonthService,
    ResizeService, EventRenderedArgs, DragAndDropService, CellTemplateArgs, getWeekNumber,GroupModel
} from '@syncfusion/ej2-angular-schedule';
import { timelineResourceData, resourceData } from './data';
import { extend, Internationalization } from '@syncfusion/ej2-base';

/**
 * Sample for Schedule header rows
 */

@Component({
    selector: 'app-root',
     styles: [`    
    .timeline-resource-grouping.e-schedule:not(.e-device) .e-agenda-view .e-content-wrap table td:first-child {
        width: 90px;
    }
    .timeline-resource-grouping.e-schedule .e-agenda-view .e-resource-column {
        width: 100px;
    }
    `],
    templateUrl: 'app.component.html',
    providers: [TimelineMonthService, ResizeService, DragAndDropService]
})
export class AppComponent {
    public scheduleObj: ScheduleComponent;
     public selectedDate: Date = new Date(2018, 3, 4);
   public eventSettings: EventSettingsModel = {
        dataSource: <Object[]>extend([], resourceData.concat(timelineResourceData), null, true)
    };
    public monthInterval: Number = 12;
    public currentView: View = 'TimelineMonth';
    public instance: Internationalization = new Internationalization();
     public group: GroupModel = {
        resources: ['Projects', 'Categories']
    };
    public projectDataSource: Object[] = [
        { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
        { text: 'PROJECT 2', id: 2, color: '#56ca85' },
        { text: 'PROJECT 3', id: 3, color: '#df5286' }
    ];
    public categoryDataSource: Object[] = [
        { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
        { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
        { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
        { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
        { text: 'Micheal', id: 5, groupId: 3, color: '#df5286' },
        { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
    ];
    getMonthDetails(value: CellTemplateArgs): string {
        return this.instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'y' });
    }

    getWeekDetails(value: CellTemplateArgs): string {
        return 'Week ' + getWeekNumber((value as CellTemplateArgs).date);
    }
    getDateHeaderText(value: CellTemplateArgs): string {
        return this.instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'Md' });
    }

    getDayHeaderText(value: CellTemplateArgs): string {
        return this.instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'E' });
    }

    onEventRendered(args: EventRenderedArgs): void {
        const categoryColor: string = args.data.CategoryColor as string;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }
}

