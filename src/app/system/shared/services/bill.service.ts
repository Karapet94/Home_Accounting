import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "../model/Bill.model";
import {BaseApi} from "../core/BaseApi";
@Injectable()
export class BillService extends BaseApi{
    constructor(public http:HttpClient){
        super(http)
    }
   /* getBill():Observable<any>{
        return this.http.get('http://localhost:3000/bill')
    }

    */
    getBill():Observable<Bill>{
        return this.get('bill')
    }

    updateBill(bill:Bill):Observable<Bill>{
        return this.put('bill', bill)
    }

    getCurrency(base:string = 'RUB'):Observable<any>{
        return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=USD,EUR`)
    }
}