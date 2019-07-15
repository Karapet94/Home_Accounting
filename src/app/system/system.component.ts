import {Component, HostBinding} from "@angular/core";
import {fadeStageTrigger} from "../shared/fade.animation";
@Component({
    selector: 'wfm-system',
    templateUrl: './system.component.html',
    animations: [fadeStageTrigger]
})

export class SystemComponent{
    @HostBinding('@fade') a = true;
}