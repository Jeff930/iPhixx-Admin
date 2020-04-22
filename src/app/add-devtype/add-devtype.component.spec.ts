import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDevtypeComponent } from './add-devtype.component';

describe('AddDevtypeComponent', () => {
  let component: AddDevtypeComponent;
  let fixture: ComponentFixture<AddDevtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDevtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDevtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
