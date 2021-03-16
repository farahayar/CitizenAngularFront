import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsSignalesComponent } from './posts-signales.component';

describe('PostsSignalesComponent', () => {
  let component: PostsSignalesComponent;
  let fixture: ComponentFixture<PostsSignalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsSignalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsSignalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
