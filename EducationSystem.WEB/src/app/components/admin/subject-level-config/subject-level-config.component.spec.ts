import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectLevelConfigComponent } from './subject-level-config.component';

describe('SubjectLevelConfigComponent', () => {
    let component: SubjectLevelConfigComponent;
    let fixture: ComponentFixture<SubjectLevelConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ SubjectLevelConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(SubjectLevelConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
