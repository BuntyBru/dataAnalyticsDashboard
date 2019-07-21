import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NbCardModule } from '@nebular/theme';
import {EChartsComponent} from './e-charts/e-charts.component'
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EChartsComponent
  ]
})
export class ChartsModule { }
