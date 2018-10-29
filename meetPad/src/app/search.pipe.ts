import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchText: any, type?: any): any {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    if (type == 'users') {
      return items.filter(it => {
        return it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText);
      });
    } else {
      return items.filter(it => {
        return it.title.toLowerCase().includes(searchText) ||
          it.location.toLowerCase().includes(searchText) ||
          new Date(it.time.start).toDateString().includes(searchText)
      });
    }
  }

}
