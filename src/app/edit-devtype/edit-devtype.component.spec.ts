import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDevtypeComponent } from './edit-devtype.component';

describe('EditDevtypeComponent', () => {
  let component: EditDevtypeComponent;
  let fixture: ComponentFixture<EditDevtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDevtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDevtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
