/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobsGridComponent } from './jobs-grid.component';

describe('JobsGridComponent', () => {
  let component: JobsGridComponent;
  let fixture: ComponentFixture<JobsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
