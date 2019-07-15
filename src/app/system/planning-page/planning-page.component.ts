import {Component, OnInit, OnDestroy} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventService} from "../shared/services/evant.service";
import {Subscription, Observable} from "rxjs";
import {Bill} from "../shared/model/Bill.model";
import {Category} from "../shared/model/category.model";
import {WFMEvent} from "../shared/model/event.model";

@Component({
    selector: 'wtm-planning-page',
    templateUrl: './planning-page.component.html',
    styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
    isLoaded = false;
    sub1: Subscription;
    bill: Bill;
    categories: Category[];
    events: WFMEvent[];

    constructor(private billService: BillService,
                private categoriesService: CategoriesService,
                private eventService: EventService) {
    }
    getCategoryCost(category:Category): number {
        const categoryEvants = this.events.filter(e => e.category === category.id && e.type === 'outcome');
        return categoryEvants.reduce((total, e) => {
            total += e.amount;
            return total;
        }, 0)
    }
    getPercent(category: Category):number{
        const percent = (100 * this.getCategoryCost(category))/ category.capacity;
        return percent > 100 ? 100: percent;
    }
    getCategoryPercent(category:Category):string{
        return this.getPercent(category)+ '%'
    }

    getClassColorName(category:Category):string{
        const percent =this.getPercent(category);
        return  percent >= 95 ? 'danger': percent> 60 ? 'warning' : 'success'
    }

    ngOnInit() {
        this.sub1 = Observable.combineLatest(
            this.billService.getBill(),
            this.categoriesService.getCategories(),
            this.eventService.getEvent()
        ).subscribe((data: [Bill, Category[], WFMEvent[]]) => {
            this.bill = data[0];
            this.categories = data[1];
            this.events = data[2];
            this.isLoaded = true;

        })
    }
    ngOnDestroy(){
        if(this.sub1){
            this.sub1.unsubscribe();
        }
    }

}
