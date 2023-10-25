import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedAgentsComponent } from './accepted-agents.component';

describe('AcceptedAgentsComponent', () => {
  let component: AcceptedAgentsComponent;
  let fixture: ComponentFixture<AcceptedAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedAgentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
