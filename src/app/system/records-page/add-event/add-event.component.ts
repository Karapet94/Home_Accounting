import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Category} from "../../shared/model/category.model";
import {NgForm} from "@angular/forms";
import {WFMEvent} from "../../shared/model/event.model";
import * as moment from "moment";
import {EventService} from "../../shared/services/evant.service";
import {BillService} from "../../shared/services/bill.service";
import {Bill} from "../../shared/model/Bill.model";
import {Subscription} from "rxjs";
import {Messages} from "../../../shared/models/messages.model";

@Component({
    selector: 'wtm-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
    sub1: Subscription;
    sub2: Subscription;
    message: Messages

    @Input() categories: Category[] = [];
    type = [
        {type: 'income', label: 'Income'},
        {type: 'outcome', label: 'Outcome'},
    ];

    constructor(private EventService: EventService,
                private BillService: BillService) {
    }

    ngOnInit() {
        this.message = new Messages('success', '');
    }

    onSubmit(form: NgForm) {
        let {amount, description, category, type} = form.value;
        if (amount < 0) {
            amount *= -1
        }

        const event = new WFMEvent(
            type, amount, +category,
            moment().format('DD.MM.YYYY HH:mm:ss'), description
        );
        this.sub1 = this.BillService.getBill()
            .subscribe((bill: Bill) => {
                let value = 0;
                if (type === 'outcome') {
                    if (amount > bill.value) {
                        return this.message = new Messages('danger', `You have not enough money. you need $${amount - bill.value}`);
                    }
                    else {
                        value = bill.value - amount;
                    }
                } else {
                    value = bill.value + amount;
                }
                this.sub2 = this.BillService.updateBill({value, currency: bill.currency})
                    .mergeMap(() => this.EventService.addEvent(event))
                    .subscribe(() => {
                        form.setValue({
                            amount: 0,
                            description: "",
                            category: 1,
                            type: 'outcome'
                        });
                        this.message.type = 'success';
                        this.message.text = 'Add event done successfully';
                        window.setTimeout(()=>this.message.text = '', 5000)
                    });
            });

    }
    ngOnDestroy() {
        if (this.sub1) this.sub1.unsubscribe();
        if (this.sub2) this.sub2.unsubscribe();
    }

}
