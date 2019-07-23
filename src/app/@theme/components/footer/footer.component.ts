import { Component } from '@angular/core';
import {DataService} from '../../../pages/e-commerce/data.service';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  
  `,
})
export class FooterComponent {

  type:any='All';
  constructor(private backService:DataService){}

}
