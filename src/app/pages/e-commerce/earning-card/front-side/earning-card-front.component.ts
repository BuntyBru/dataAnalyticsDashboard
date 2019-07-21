import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { interval , Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { LiveUpdateChart, EarningData } from '../../../../@core/data/earning';
import {DataService} from '../../data.service';

@Component({
  selector: 'ngx-earning-card-front',
  styleUrls: ['./earning-card-front.component.scss'],
  templateUrl: './earning-card-front.component.html',
})
export class EarningCardFrontComponent implements OnDestroy, OnInit {
  private alive = true;

  @Input() selectedCurrency: string = 'All';
  @Input() name: any;
  intervalSubscription: Subscription;
  currencies: string[] = ['All', 'Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  currentTheme: string;
  earningLiveUpdateCardData: LiveUpdateChart;
  liveUpdateChartData: { value: [string, number] }[];

  selectedMonth={
    'total_profit':'All'
  }

  constructor(private themeService: NbThemeService,
              private earningService: EarningData, private backService:DataService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit() {
    this.getEarningCardData(this.selectedCurrency);//selected month
  }

  changeCurrency(currency, identity) {
  /*  if (this.selectedCurrency !== currency) {
      this.selectedCurrency = currency;

      this.getEarningCardData(this.selectedCurrency);
    }*/
    //this.backService.selectedMonth = currency;
    this.backService.selectedMonth[identity] = currency;
    console.log("change in currency", currency,identity, this.backService.current_country);
    
    console.log("this is the new data", this.backService.monthly_data['any_key'][currency]);
    if(currency === 'All')
    {
      for(let i=0;i<this.backService.countryListingMain.length;i++)
      {
        if(this.backService.current_country == this.backService.countryListingMain[i].alpha3code)
        {
          console.log(this.backService.countryListingMain[i]);
          console.log("yeaaah Allit is");
          this.backService.aboveListing[identity]=this.backService.countryListingMain[i][identity];
          this.backService.aboveListing[identity+'_per']=this.backService.countryListingMain[i][identity+'_per'];
        }
      }

    }
    else
    {

    this.backService.aboveListing[identity] = this.backService.monthly_data['any_key'][currency][identity];
    this.backService.aboveListing[identity+'_per'] = this.backService.monthly_data['any_key'][currency][identity+'_per'];
    }
  }

  private getEarningCardData(currency) {
    this.earningService.getEarningCardData(currency)
      .pipe(takeWhile(() => this.alive))
      .subscribe((earningLiveUpdateCardData: LiveUpdateChart) => {
        this.earningLiveUpdateCardData = earningLiveUpdateCardData;
        this.liveUpdateChartData = earningLiveUpdateCardData.liveChart;

        this.startReceivingLiveData(currency);
      });
  }

  startReceivingLiveData(currency) {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(200)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => this.earningService.getEarningLiveUpdateCardData(currency)),
      )
      .subscribe((liveUpdateChartData: any[]) => {
        this.liveUpdateChartData = [...liveUpdateChartData];
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
