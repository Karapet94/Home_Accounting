import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {BaseApi} from "../../system/shared/core/BaseApi";
@Injectable()
export class UserService extends BaseApi{

    constructor(public http: HttpClient){
        super (http)
    }
    getUserEmail(email: string): Observable<User>{
        return this.get(`users?email=${email}`)
            .map((users: User[]) => users[0] ? users[0] : undefined);
    }

    creteNewUser(user: User): Observable<User>{
        return this.post('users',user)
    }
    /*
    getUserEmail(email: string){
        return this.http.get(`http://localhost:3000/users?email=${email}`).map((user: User[]) => user[0] ? user[0] : undefined)
    }
    creteNewUser(user:User):Observable<any>{
        return this.http.post(`http://localhost:3000/users`, user)

    }*/

}