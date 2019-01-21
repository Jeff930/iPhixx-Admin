import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByInvoiceComponent } from './filter-by-invoice.component';

describe('FilterByInvoiceComponent', () => {
  let component: FilterByInvoiceComponent;
  let fixture: ComponentFixture<FilterByInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterByInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
