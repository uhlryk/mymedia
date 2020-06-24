import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayableThumbnailComponent } from './playable-thumbnail.component';

describe('PlayableThumbnailComponent', () => {
  let component: PlayableThumbnailComponent;
  let fixture: ComponentFixture<PlayableThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayableThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayableThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
