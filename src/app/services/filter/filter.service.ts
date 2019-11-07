import { Injectable } from '@angular/core';
import { Filter } from 'src/app/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters = new Map();
  public filters$ = new BehaviorSubject<Map<string, Filter>>(new Map());

  addFilter(filter: Filter) {
    this.filters.set(filter.id, filter);
    this.filters$.next(this.filters);
  }

  getFilters() {

  }

  removeFilter(id: string) {
    this.filters.delete(id);
    this.filters$.next(this.filters);
  }
}
