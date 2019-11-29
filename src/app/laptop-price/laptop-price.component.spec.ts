import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopPriceComponent } from './laptop-price.component';

describe('LaptopPriceComponent', () => {
  let component: LaptopPriceComponent;
  let fixture: ComponentFixture<LaptopPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaptopPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptopPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
