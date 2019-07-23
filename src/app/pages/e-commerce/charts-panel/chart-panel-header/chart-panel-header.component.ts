import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';


@Component({
  selector: 'ngx-chart-panel-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-panel-header.component.html',
})
export class ChartPanelHeaderComponent implements OnDestroy {

  private alive = true;

  @Output() periodChange = new EventEmitter<string>();

  @Input() type: string = 'All';
  types: string[] = ['All','Jan', 'Feb', 'Mar', 'Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  
  constructor() {}


  //The below function takes care of the dropdown functionality of choosing months
  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit(period);
  }*

  ngOnDestroy() {
    this.alive = false;
  }
}
