import { Injectable } from '@angular/core';
import { Filter } from 'src/app/interfaces';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters = new Map();
  public editFilter$ = new Subject();
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

  editFilter(filter: Filter){
    this.editFilter$.next(filter);
  }
}
