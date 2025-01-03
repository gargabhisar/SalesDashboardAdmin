import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbnFormat',
  standalone: true
})
export class IsbnFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Ensure the value has the correct length
    value = value.replace(/-/g, ''); // Remove any dashes

    if (value.length === 13) {
      return `${value.substring(0, 3)}-${value.substring(3, 5)}-${value.substring(5, 11)}-${value.substring(11, 12)}-${value.substring(12)}`;
    }
    return value;
  }

}
