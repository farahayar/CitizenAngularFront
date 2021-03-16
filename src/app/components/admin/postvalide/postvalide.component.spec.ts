import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostvalideComponent } from './postvalide.component';

describe('PostvalideComponent', () => {
  let component: PostvalideComponent;
  let fixture: ComponentFixture<PostvalideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostvalideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostvalideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
