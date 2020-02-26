import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogisticsComponent } from './view-logistics.component';

describe('ViewLogisticsComponent', () => {
  let component: ViewLogisticsComponent;
  let fixture: ComponentFixture<ViewLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
