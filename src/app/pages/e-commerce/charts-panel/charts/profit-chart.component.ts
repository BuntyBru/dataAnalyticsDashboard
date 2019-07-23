import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import {DataService} from '../../data.service'

@Component({
  selector: 'ngx-profit-chart',
  styleUrls: ['./charts-common.component.scss'],
  template: `
    <div echarts [options]="options" class="echart" (chartInit)="onChartInit($event)"></div>
  `,
})
export class ProfitChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Input()
  profitChartData: any;

  private alive = true;

  echartsIntance: any;
  options: any = {};

  constructor(private theme: NbThemeService, private backService:DataService) {
   
  }

  ngOnChanges(): void {
    if (this.echartsIntance) {
      this.updateProfitChartOptions(this.profitChartData);
    }
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        const eTheme: any = config.variables.profit;
console.log("ProfitChartData for first round", this.profitChartData);
        this.setOptions(eTheme);
      });
  }

  setOptions(eTheme) {
    this.options = {
      backgroundColor: eTheme.bg,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
         data:this.backService.chartData.chartLabel,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
            },
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: eTheme.splitLineColor,
            },
          },
          axisLabel: {
            color: eTheme.axisTextColor,
            fontSize: eTheme.axisFontSize,
          },
        },
      ],
      series:{
          name: 'All orders',
          type: 'bar',
          barWidth: '60%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: eTheme.secondLineGradFrom,
              }, {
                offset: 1,
                color: eTheme.thirdLineGradTo,
              }]),
            },
          },
      data:this.backService.chartData.data
        },
      
    };
  }


  //Function for updating the chart
  updateProfitChartOptions(profitChartData) {
    const options = this.options;
   console.log("the month chosen for display is ",this.backService.monthChosenForGraph);
   
   this.profitChartData = this.backService.barGraphData[this.backService.monthChosenForGraph];
   this.backService.chartData= this.backService.barGraphData[this.backService.monthChosenForGraph];

  

    this.echartsIntance.setOption({
      xAxis: {
     data:this.backService.chartData.chartLabel,
      },
      series: 
        {
          name: 'All orders',
          type: 'bar',
          barWidth: '60%',
          data:this.backService.chartData.data,
        },
      
      
    });
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
