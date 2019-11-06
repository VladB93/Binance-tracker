import { Injectable } from '@angular/core';
import { Filter } from 'src/app/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters = [];
  public filters$ = new BehaviorSubject<Filter[]>([]);

  addFilter(filter: Filter) {
    this.filters.push(filter);
    this.filters$.next(this.filters);
  }

  getFilters() {

  }
}
