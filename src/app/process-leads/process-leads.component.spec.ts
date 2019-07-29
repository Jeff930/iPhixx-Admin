import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessLeadsComponent } from './process-leads.component';

describe('ProcessLeadsComponent', () => {
  let component: ProcessLeadsComponent;
  let fixture: ComponentFixture<ProcessLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
