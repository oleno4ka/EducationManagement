import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectDialog } from './add-subject-dialog.component';

describe('DialogOverviewExampleDialog', () => {
    let component: AddSubjectDialog;
    let fixture: ComponentFixture<AddSubjectDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [AddSubjectDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(AddSubjectDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
