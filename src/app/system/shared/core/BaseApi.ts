import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../shared/models/user.model";
@Injectable()
export class BaseApi{
    constructor(public http:HttpClient){};
    private baseUrl = 'http://localhost:3000/';
    private getUrl(url:string = ''){
        return this.baseUrl + url
    }

    public get(url:string = ''):Observable<any>{
        return this.http.get(this.getUrl(url));
    }
    public post(url:string = '',data):Observable<any>{
        return this.http.post(this.getUrl(url),data);
    }
    public put(url:string = '', data):Observable<any>{
        return this.http.put(this.getUrl(url),data);
    }

}