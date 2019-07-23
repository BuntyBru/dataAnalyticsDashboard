import { Component } from '@angular/core';
import {DataService} from '../../../pages/e-commerce/data.service';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
   
  <nb-select class="period-select" [selected]="type" (selectedChange)="changePeriod($event)">
  <nb-option *ngFor="let period of backService.footerSelector" [value]="period">
    {{ period }}
  </nb-option>
</nb-select>
  `,
})
export class FooterComponent {

  type:any='All';
  constructor(private backService:DataService){}

  changePeriod(month)
  {
    console.log("this is the month selected in the main selector", month);
    //change the month with respect to the selector in the header cards
    console.log("this is the current country", this.backService.current_country);
    this.backService.selectedMonth={
      "total_profit":month,
      "active_users":month,
      "new_orders":month,
      "open_complaints":month  
      };



      if(month === 'All')
      {
        for(let i=0;i<this.backService.countryListingMain.length;i++)
        {
          if(this.backService.current_country == this.backService.countryListingMain[i].alpha3code)
          {   
            for(let j=0;j<this.backService.identities.length;j++)
            {
              this.backService.aboveListing[this.backService.identities[j]]=this.backService.countryListingMain[i][this.backService.identities[j]];
            }
          }
        }
  
      }
      else
      {
        for(let j=0;j<this.backService.identities.length;j++)
        {
          this.backService.aboveListing[this.backService.identities[j]] = this.backService.monthly_data['any_key'][month][this.backService.identities[j]];
        }
  /*
      this.backService.aboveListing['total_profit'] = this.backService.monthly_data['any_key'][month]['total_profit'];
      this.backService.aboveListing['total_profit_per'] = this.backService.monthly_data['any_key'][month]['total_profit_per'];
      this.backService.aboveListing['active_users']=this.backService.monthly_data['any_key'][month]['active_users'];
      this.backService.aboveListing['active_users_per']=this.backService.monthly_data['any_key'][month]['active_users_per'];
      this.backService.aboveListing['new_orders']=this.backService.monthly_data['any_key'][month]['new_orders'];
      this.backService.aboveListing['new_orders_per']=this.backService.monthly_data['any_key'][month]['new_orders_per'];
      this.backService.aboveListing['open_complaints']=this.backService.monthly_data['any_key'][month]['open_complaints'];
      this.backService.aboveListing['open_complaints_per']=this.backService.monthly_data['any_key'][month]['open_complaints_per'];*/
      }






    //change the month with respect to the selector in the graph
    this.backService.monthChosenForGraph = month;
    this.backService.chartData = this.backService.barGraphData[month];
  }
}
