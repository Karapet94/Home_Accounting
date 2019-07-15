import {Component, OnInit, HostBinding} from '@angular/core';
import {Router} from "@angular/router";
import {fadeStageTrigger} from "../shared/fade.animation";

@Component({
  selector: 'wtm-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeStageTrigger]
})
export class AuthComponent implements OnInit {
  @HostBinding('@fade') a = true;

  constructor(private router: Router ) { }

  ngOnInit() {
    this.router.navigate(['login'])
  }

}
