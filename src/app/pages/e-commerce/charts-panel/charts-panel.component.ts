import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

//import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChart } from '../../../@core/data/orders-chart';
import { ProfitChart } from '../../../@core/data/profit-chart';
//import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';
import {DataService} from '../data.service';
import { NbWindowService } from '@nebular/theme';
import {ChartPanelHeaderComponent} from './chart-panel-header/chart-panel-header.component'
import { from } from 'rxjs';
import { importType } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
  
})
export class ECommerceChartsPanelComponent implements OnDestroy {

  private alive = true;

  //chartPanelSummary: OrderProfitChartSummary[];
  period: string = this.backService.monthChosenForGraph;
  ordersChartData: OrdersChart;
  profitChartData: any;

  //@ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
 // @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  constructor(private windowService: NbWindowService ,private backService: DataService) {
  
    this.getProfitChartData(this.period);
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) 
    {
      this.period = value;
    }
    console.log("this is the period which has been selected", this.period);
    this.backService.monthChosenForGraph=this.period;
    //this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

 

  getProfitChartData(period: string) {
      console.log("First Data Entry for the bar graph");
      this.backService.chartData = this.backService.barGraphData[period];
  }
 
  onResizeElement()
  {
    console.log("Resizing the element was clicked");
    
    this.backService.mapHide=false;
    this.backService.graphParent='col-md-12';
    this.backService.graphHeight='large';

  }

  onNormalsizeElement()
  {
    console.log("Normal Sizing the element was clicked");
    this.backService.mapHide=true;
    this.backService.graphParent='col-md-6';
    this.backService.graphHeight='small';
  }

 

  ngOnDestroy() {
    this.alive = false;
  }
}
