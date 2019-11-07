import { Component, ViewChild } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';
import { Filter } from 'src/app/interfaces';
import { FilterType, ComparisonType } from 'src/app/enums';
import { FormControl, FormGroup } from 'ngx-strongly-typed-forms';
import { Validators, ValidationErrors } from '@angular/forms';
import { IgxDialogComponent } from 'igniteui-angular';
import uuid from 'uuidv4';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent {
  @ViewChild(IgxDialogComponent, {static: true}) dialogForm: IgxDialogComponent;

  private errors = [];

  public filterForm = new FormGroup<Filter>({
    id: new FormControl<string>(),
    type: new FormControl<FilterType>(null, Validators.required),
    interval: new FormControl<number>(null, [Validators.max(500), Validators.required, Validators.min(1)]),
    comparison: new FormControl<ComparisonType>(null, Validators.required),
    percentage: new FormControl<number>(null, Validators.required),
  });
  public ComparisonType = ComparisonType;
  public FilterType = FilterType;

  constructor(private filterService: FilterService) {
    this.filterService.editFilter$.subscribe((e: Filter) => {
      this.filterForm  = new FormGroup<Filter>({
        id: new FormControl<string>(e.id),
        type: new FormControl<FilterType>(e.type, Validators.required),
        interval: new FormControl<number>(e.interval, [Validators.max(500), Validators.required, Validators.min(1)]),
        comparison: new FormControl<ComparisonType>(e.comparison, Validators.required),
        percentage: new FormControl<number>(e.percentage, Validators.required),
      });
      // this.filterForm.setValue(e);
      this.dialogForm.open();
    });
  }

  public addFilter() {
    this.getFormValidationErrors();
  }

  private getFormValidationErrors() {
    this.errors = [];
    Object.keys(this.filterForm.controls).forEach((key: any) => {
      const controlErrors: ValidationErrors = this.filterForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.errors.push({
            'Key Control': key,
            'Key Error': keyError,
            'Err Value': controlErrors[keyError]
          });
        });
      }
    });
    let message = '';
    this.errors.forEach((e: any) => {
      message += `${e['Key Control'].toUpperCase()} `;
      if (e['Key Error'] === 'max') {
        message += ` maximum value is ${e['Err Value'].max}`;
      }
      if (e['Key Error'] === 'min') {
        message += ` minimum value is ${e['Err Value'].min}`;
      }
      if (e['Key Error'] === 'required') {
        message += 'is required';
      }
      message += '\n';
    });
    if (message !== '') {
      alert(message);
    } else {
      this.dialogForm.close();
      if(!this.filterForm.value.id){
        this.filterForm.value.id = uuid();
      }
      this.filterForm.value.apply = true;
      this.filterService.addFilter(this.filterForm.value);
      this.filterForm.reset();
    }
  }

}
