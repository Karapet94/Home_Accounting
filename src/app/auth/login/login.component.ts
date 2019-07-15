import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router, ActivatedRoute, Params} from "@angular/router";

import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user.model";
import {Messages} from "../../shared/models/messages.model";
import {AuthService} from "../../shared/services/auth.service";
import {fadeStageTrigger} from "../../shared/fade.animation";
import {Title, Meta} from "@angular/platform-browser";

@Component({
    selector: 'wtm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [fadeStageTrigger]
})
export class LoginComponent implements OnInit {

    private forms: FormGroup;
    private message: Messages;

    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private title: Title,
                private meta: Meta
    ) {
        title.setTitle('Login');
        meta.addTags([
            {name :'keywords', content: 'Login system вход' },
            {name: 'description', content: 'Page for Login' }
        ])
    }

    private showMessages(text: string, type: string = 'danger',) {
        this.message = new Messages(type, text);
        window.setTimeout(() => {
            this.message.text = ''
        }, 5000)

    }

    ngOnInit() {
        this.message = new Messages('danger', '');
        this.route.queryParams
            .subscribe((params: Params) => {
            if(params['nowCanLogin']){
                this.showMessages('Now you can sign in','success')
            }else  if(params['accessDenied']){
                this.showMessages('First You must Login','warning')
            }
            });
        this.forms = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
    }

    onSubmit() {

        const formData = this.forms.value;
        this.userService.getUserEmail(formData.email)
            .subscribe((user: User) => {

                if (user) {
                    if (user.password === formData.password) {
                        this.message.text = '';
                        window.localStorage.setItem('user', JSON.stringify(user));
                        this.authService.login();
                        this.router.navigate(['/system', 'bill'])
                    } else {
                        this.showMessages('This password is wrong')
                    }
                } else {
                    this.showMessages("This user didn't register")
                }
            })
    }

}
/*"email": "wfm@mail.ru",*/