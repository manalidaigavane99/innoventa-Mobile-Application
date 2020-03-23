import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feedback'
})
export class FeedbackPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
