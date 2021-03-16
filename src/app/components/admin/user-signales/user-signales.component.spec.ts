import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignalesComponent } from './user-signales.component';

describe('UserSignalesComponent', () => {
  let component: UserSignalesComponent;
  let fixture: ComponentFixture<UserSignalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
