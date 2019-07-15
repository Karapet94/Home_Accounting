import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Category} from "../../shared/model/category.model";

@Component({
    selector: 'wtm-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent{

    @Output() onFilterCancel = new EventEmitter();
    @Output() onFilterApply = new EventEmitter();
    @Input() categories: Category[] = [];

    periodsType = [
        {type: 'd', label: 'Day'},
        {type: 'w', label: 'Week'},
        {type: 'M', label: 'Month'}
    ];
    types = [
        {type: 'income', label: 'Income'},
        {type: 'outcome', label: 'Expense'},
    ];
    selectedPeriod: string = 'd';
    selectedTypes = [];
    selectedCategories = [];

    onFilterClose() {
        this.onFilterCancel.emit();
        this.selectedTypes = [];
        this.selectedCategories = [];
        this.selectedPeriod = 'd'
    }

    private calculateInputParams(field: string, checked: boolean, value: string) {
        if (checked) {
            this[field].indexOf(value) === -1 ? this[field].push(value) : null;
        } else {
            this[field] = this[field].filter(i => i !== value)
        }
    }

    handleChangeTypey({checked, value}) {
        this.calculateInputParams('selectedTypes', checked, value)
    }

    handleChangeCategory({checked, value}) {
        this.calculateInputParams('selectedCategories', checked, value)
    }

    applyFilter() {
        this.onFilterApply.emit({
            types: this.selectedTypes,
            categories: this.selectedCategories,
            period: this.selectedPeriod
        })
    }

}
