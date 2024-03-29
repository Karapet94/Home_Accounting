import {Component, OnInit, OnDestroy} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {Bill} from "../shared/model/Bill.model";
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'wtm-bill-page',
    templateUrl: './bill-page.component.html',
    styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
    sub1: Subscription;
    sub2: Subscription;

    bill: Bill;
    currency: any;
    isLoad:Boolean = false;

    constructor(private billService: BillService) {
    }

    ngOnInit() {

        this.sub1 = Observable.combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency()
        ).subscribe((data: [Bill, any]) => {
            this.bill = data[0];
            this.currency = data[1];
            this.isLoad = true;
        });

    }
    onRefresh(){
        this.isLoad = false;
        this.sub2 = this.billService.getCurrency()
            .delay(2000)
            .subscribe((currency: any) => {
                this.currency = currency;
                this.isLoad = true;
            })
    }
    ngOnDestroy(){
        this.sub1.unsubscribe();
        if(this.sub2){
            this.sub2.unsubscribe()
        }
    }

}
