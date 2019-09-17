import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedCoinsGridComponent } from './tagged-coins-grid.component';

describe('TaggedCoinsTableComponent', () => {
  let component: TaggedCoinsGridComponent;
  let fixture: ComponentFixture<TaggedCoinsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedCoinsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedCoinsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
