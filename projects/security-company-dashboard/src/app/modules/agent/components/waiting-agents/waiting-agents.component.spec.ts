import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingAgentsComponent } from './waiting-agents.component';

describe('WaitingAgentsComponent', () => {
  let component: WaitingAgentsComponent;
  let fixture: ComponentFixture<WaitingAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingAgentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
