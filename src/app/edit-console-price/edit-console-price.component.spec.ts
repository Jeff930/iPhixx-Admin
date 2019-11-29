import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsolePriceComponent } from './edit-console-price.component';

describe('EditConsolePriceComponent', () => {
  let component: EditConsolePriceComponent;
  let fixture: ComponentFixture<EditConsolePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConsolePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConsolePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
