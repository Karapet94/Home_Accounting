import {Component, OnInit, Input} from '@angular/core';
import {Category} from "../../shared/model/category.model";
import {WFMEvent} from "../../shared/model/event.model";

@Component({
  selector: 'wtm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events :WFMEvent[] = [];
  searchValue = '';
  searchPlaceholder: string = 'amount';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    })
  }

  getClassName(e: WFMEvent){
    if(e.type === 'outcome'){
      return 'label label-danger'
    }
    if(e.type === 'income'){
      return 'label label-success'
    }

  }

  changeCriteria(field: string){
      this.searchPlaceholder = field;
      this.searchField = field
  }


}
