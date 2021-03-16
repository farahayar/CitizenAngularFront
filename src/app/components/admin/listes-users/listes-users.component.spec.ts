import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesUsersComponent } from './listes-users.component';

describe('ListesUsersComponent', () => {
  let component: ListesUsersComponent;
  let fixture: ComponentFixture<ListesUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
