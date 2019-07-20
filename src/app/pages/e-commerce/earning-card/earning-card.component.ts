import { Component,Input } from '@angular/core';

@Component({
  selector: 'ngx-earning-card',
  styleUrls: ['./earning-card.component.scss'],
  templateUrl: './earning-card.component.html',
})
export class EarningCardComponent {
@Input() name:any;
  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
