import {Component, Output, EventEmitter, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/model/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'wtm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{
  sub1: Subscription;
  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoryServise:CategoriesService) { }
  onSubmit(form:NgForm){
    let {name, capacity} = form.value;
    const category:Category = {name, capacity};
    this.sub1 = this.categoryServise.addCategory(category)
        .subscribe((category:Category) =>{
      form.reset();
      form.form.patchValue({capacity: 1});
      this.onCategoryAdd.emit(category);
        })
  }

  ngOnDestroy(){
    if (this.sub1) this.sub1.unsubscribe();
  }
}
