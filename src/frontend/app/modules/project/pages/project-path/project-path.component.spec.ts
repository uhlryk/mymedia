import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPathComponent } from './project-path.component';

describe('ProjectPathComponent', () => {
  let component: ProjectPathComponent;
  let fixture: ComponentFixture<ProjectPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
