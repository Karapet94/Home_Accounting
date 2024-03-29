import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../../shared/models/user.model";

@Component({
  selector: 'wtm-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {


  date: Date = new Date();
  user: User;
  constructor(private authService: AuthService,
  private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }
  logOut(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
