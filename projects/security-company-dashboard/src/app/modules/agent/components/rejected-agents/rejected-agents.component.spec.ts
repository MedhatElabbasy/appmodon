import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedAgentsComponent } from './rejected-agents.component';

describe('RejectedAgentsComponent', () => {
  let component: RejectedAgentsComponent;
  let fixture: ComponentFixture<RejectedAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedAgentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
