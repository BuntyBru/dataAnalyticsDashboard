import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  currencies: string[] = ['All', 'Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  currentTheme: string;
  liveUpdateChartData: { value: [string, number] }[];

  selectedMonth={
    'total_profit':'All'
  }

  constructor( private backService:DataService) {
  }

  ngOnInit() {

  }

  changeCurrency(currency, identity) {
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

  ngOnDestroy() {
    this.alive = false;
  }
}
