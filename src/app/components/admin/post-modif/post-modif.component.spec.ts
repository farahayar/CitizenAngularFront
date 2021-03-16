import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostModifComponent } from './post-modif.component';

describe('PostModifComponent', () => {
  let component: PostModifComponent;
  let fixture: ComponentFixture<PostModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
