import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomListBoxComponent } from './custom-list-box.component';

describe('CustomListBoxComponent', () => {
  let component: CustomListBoxComponent;
  let fixture: ComponentFixture<CustomListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
