import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchText: any, type?: any): any {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    if (type == 'language') {
      return items.filter(it => {
        for (let language of it.languages)
          if (language.name.toLowerCase().includes(searchText))
            return true
      });
    } else if (type == 'currency') {
      return items.filter(it => {
        for (let currency of it.currencies) {
          if (currency.name && currency.name.toLowerCase().includes(searchText))
            return true
        }
      });
    } else {
      return items.filter(it => {
        return it.title.toLowerCase().includes(searchText);
      });
    }
  }

}
