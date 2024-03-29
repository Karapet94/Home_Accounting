import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import {Title, Meta} from "@angular/platform-browser";

@Component({
    selector: 'wtm-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    constructor(private userService: UserService,
                private router: Router,
                private title: Title,
                private meta: Meta) {
        title.setTitle('Registration');
        meta.addTags([
            {name:'keywords', content:'Register Registration Login system регистрация'},
            {name:'description', content:'Page for Registration'}
        ])
    }
    private form: FormGroup;


    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'name': new FormControl('', [Validators.required]),
            'agree': new FormControl(false, [Validators.requiredTrue])
        })
    }

    onSubmit() {
        const {email, password, name} = this.form.value;
        const user = new User(email, password, name);
        this.userService.creteNewUser(user)
            .subscribe(() => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        nowCanLogin: true
                    }
                })
            })
    }

    forbiddenEmails(control: FormControl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userService.getUserEmail(control.value)
                .subscribe((user: User) => {
                    if (user) {
                        resolve({forbiddenEmail: true})
                    } else {
                        resolve(null)
                    }
                })
        })
    }

}
