import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavVisiteurComponent } from './nav-visiteur.component';

describe('NavVisiteurComponent', () => {
  let component: NavVisiteurComponent;
  let fixture: ComponentFixture<NavVisiteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavVisiteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
