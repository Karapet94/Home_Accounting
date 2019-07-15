import {Component, OnInit, OnDestroy} from '@angular/core';
import {EventService} from "../../shared/services/evant.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {WFMEvent} from "../../shared/model/event.model";
import {Category} from "../../shared/model/category.model";

@Component({
    selector: 'wtm-history-detail',
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
                private eventService: EventService,
                private categoryService: CategoriesService) {
    }

    event: WFMEvent;
    category: Category;
    sub1: Subscription;
    isLoaded = false;

    ngOnInit() {
        this.sub1 = this.route.params
            .mergeMap((params: Params) => this.eventService.getEventById(params['id']))
            .mergeMap((event: WFMEvent) => {
                this.event = event;
                return this.categoryService.getCategoryById(event.category)
            })
            .subscribe((category:Category) => {
            this.category = category;
            this.isLoaded = true
        })
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe()
        }
    }

}
