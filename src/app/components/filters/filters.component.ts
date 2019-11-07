import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';
import { Filter } from 'src/app/interfaces';
import { ComparisonType } from 'src/app/enums';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  public filters: Filter[] = [];

  public ComparisonType = ComparisonType;

  constructor(private filterService: FilterService) {
    this.filterService.filters$.subscribe((filters: Filter[]) => {
      this.filters = filters;
      console.log(this.filters)
    });
  }
}
