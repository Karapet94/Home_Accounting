import {Component, OnInit, OnDestroy} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import * as moment from 'moment';
import {EventService} from "../shared/services/evant.service";
import {Observable, Subscription} from "rxjs";
import {Category} from "../shared/model/category.model";
import {WFMEvent} from "../shared/model/event.model";

@Component({
    selector: 'wtm-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor(private categoryService: CategoriesService,
                private eventService: EventService) {
    }

    categories: Category[] = [];
    events: WFMEvent[] = [];
    filteredEvents: WFMEvent[] =[];
    isLoaded = false;
    sub1: Subscription;
    charData = [];
    isFilterVisibility = false;

    ngOnInit() {
        this.sub1 = Observable.combineLatest(
            this.categoryService.getCategories(),
            this.eventService.getEvent()
        )
            .subscribe((data: [Category[], WFMEvent[]]) => {
                this.categories = data[0];
                this.events = data[1];
                this.setOriginalEvents();
                this.calculateChartData();
                this.isLoaded = true;
            })

    }
    setOriginalEvents(){
        this.filteredEvents = this.events;
    }

    calculateChartData(): void {
        this.charData = [];
        this.categories.forEach((category) => {
            const categoryEvent = this.filteredEvents.filter((event) => event.category === category.id && event.type === 'outcome');
            this.charData.push({
                name: category.name,
                value: categoryEvent.reduce((total, e) => {
                    total += e.amount;
                    return total;
                }, 0)
            })
        })
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe()
        }
    }

    togglefilterVisibility(dir:boolean){
        this.isFilterVisibility = dir;
    }
    openFilter(){
        this.togglefilterVisibility(true);
    }

    onFilterCancel(){
        this.togglefilterVisibility(false);
        this.setOriginalEvents();
        this.calculateChartData();
    }
    onFilterApply(filterData){
        this.togglefilterVisibility(false);
        const startPeriod = moment().startOf(filterData.period).startOf('d');
        const endPeriod = moment().endOf(filterData.period).endOf('d');
        this.filteredEvents = this.filteredEvents
            .filter((e) => {
            return filterData.types.indexOf(e.type) !==-1;
            })
            .filter((e)=>{
            return filterData.categories.indexOf(e.category.toString()) !==-1;
            })
            .filter((e)=>{
                    const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
                    return momentDate.isBetween(startPeriod, endPeriod);
            });
        this.calculateChartData();
    }


}
