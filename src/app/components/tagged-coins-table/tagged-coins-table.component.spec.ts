import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedCoinsTableComponent } from './tagged-coins-table.component';

describe('TaggedCoinsTableComponent', () => {
  let component: TaggedCoinsTableComponent;
  let fixture: ComponentFixture<TaggedCoinsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedCoinsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedCoinsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
