import {Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment';
@Pipe({
    name: 'wmfMoment'
})

export class MomentPipe implements PipeTransform{
    transform(value: string, formFrom: string, formTo: string = 'DD.MM.YYYY'): string {
        return moment(value, formFrom).format(formTo);
    }

}