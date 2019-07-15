import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/model/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {Messages} from "../../../shared/models/messages.model";
import {Subscription} from "rxjs";

@Component({
    selector: 'wtm-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
    @Input() categories: Category[] = [];
    @Output() onCategoryEdit = new EventEmitter<Category>();

    currentCategoryId = 1;
    currentCategory: Category;
    message: Messages;
    sub1: Subscription;
    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.message = new Messages('success', '');
        this.currentCategoryChange()
    }

    currentCategoryChange() {
        this.currentCategory = this.categories
            .find(c => c.id === +this.currentCategoryId);
    }

    onSubmit(form: NgForm) {
        let {capacity, name} = form.value;
        if (capacity < 0) capacity *= -1;
        const category = new Category(name, capacity, +this.currentCategoryId);
        this.sub1 = this.categoriesService.updateCategory(category)
            .subscribe((category: Category) => {
               this.onCategoryEdit.emit(category);
               this.message.text= 'Edit done successfully';
               window.setTimeout(()=>this.message.text = '', 5000)
            })
    }

    ngOnDestroy() {
        if (this.sub1) this.sub1.unsubscribe();
    }
}
