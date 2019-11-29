import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaptopPriceComponent } from './edit-laptop-price.component';

describe('EditLaptopPriceComponent', () => {
  let component: EditLaptopPriceComponent;
  let fixture: ComponentFixture<EditLaptopPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLaptopPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLaptopPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
