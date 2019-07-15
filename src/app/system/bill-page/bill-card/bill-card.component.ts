import {Component, OnInit, Input} from '@angular/core';
import {Bill} from "../../shared/model/Bill.model";

@Component({
  selector: 'wtm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  constructor() { }
  @Input() bill:Bill;
  @Input() currency: any;
  dollar: number;
  euro: number;

  ngOnInit() {
    const {rates} = this.currency;
    this.dollar = rates['USD'] * this.bill.value;
    this.euro = rates['EUR'] * this.bill.value
  }

}
