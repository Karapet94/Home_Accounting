import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseApi} from "../core/BaseApi";
import {Category} from "../model/category.model";
import {Observable} from "rxjs";
@Injectable()
export class CategoriesService extends  BaseApi{
    constructor(public http:HttpClient){
        super(http)
    }
    addCategory(category:Category):Observable<Category>{
       return this.post('categories',category)
    }
    getCategories():Observable<Category[]>{
        return this.get('categories')
    }

    updateCategory(category : Category) : Observable<Category>{
        return this.put(`categories/${category.id}`, category)
    }
    getCategoryById(id:number):Observable<Category>{
        return this.get(`categories/${id}`)
    }
}