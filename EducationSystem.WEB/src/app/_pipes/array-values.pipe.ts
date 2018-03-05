import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arrayValues',
    pure: false 
})
export class ArrayValuesPipe implements PipeTransform {

    transform(value: any, args: any[] = null): any {
        return Object.keys(value).map(key => value[key]);
    }
}
