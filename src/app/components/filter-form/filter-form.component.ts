import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';
import { Filter } from 'src/app/interfaces';
import { FilterType, ComparisonType, IntervalType } from 'src/app/enums';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent {
  public filter: Filter = {
    percentage: 0,
  };
  public ComparisonType = ComparisonType;
  public FilterType = FilterType;
  public IntervalType = IntervalType;

  constructor(private filterService: FilterService){}

  public addFilter(filter: Filter){
    console.log(this.filter)
    this.filterService.addFilter();
  }

  public setValue(value){
    if(value <= 500){
      this.filter.interval = value;
    }
  }
}
