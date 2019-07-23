import { Component, OnInit } from '@angular/core';
import {DataService} from './data.service';
import { NbDialogService } from '@nebular/theme';
import {ECommerceChartsPanelComponent} from '../e-commerce/charts-panel/charts-panel.component';
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit {

  constructor(private backService:DataService,private dialogService: NbDialogService) {}

  entries=[
    "total profits", "active users","new orders","open complaints"];

    totalEntries = [
      {
        name:"total profits",
        id:"total_profit"
      },
      {
        name:"active users",
        id:"active_users"
      },
      {
        name:"new orders",
        id:"new_orders"
      },
      {
        name:"open complaints",
        id:"open_complaints"
      }
    ];

  ngOnInit()
  {
    console.log("Ecommerce is initiated");
    
  
  }


}

