import { Component, ViewChild } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';
import { Filter } from 'src/app/interfaces';
import { FilterType, ComparisonType } from 'src/app/enums';
import { FormControl, FormGroup } from 'ngx-strongly-typed-forms';
import { Validators, ValidationErrors } from '@angular/forms';
import { IgxDialogComponent } from 'igniteui-angular';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent {
  @ViewChild(IgxDialogComponent, {static: true}) dialogForm: IgxDialogComponent;

  private errors = [];

  public filterForm = new FormGroup<Filter>({
    type: new FormControl<FilterType>(null, Validators.required),
    interval: new FormControl<number>(null, [Validators.max(500), Validators.required, Validators.min(1)]),
    comparison: new FormControl<ComparisonType>(null, Validators.required),
    percentage: new FormControl<number>(null, Validators.required),
  });
  public ComparisonType = ComparisonType;
  public FilterType = FilterType;

  constructor(private filterService: FilterService) {}

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
      this.filterForm.value.apply = true;
      this.filterService.addFilter(this.filterForm.value);
      this.filterForm.reset();
    }
  }

}
