import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentGridComponent } from './agent-grid.component';

describe('AgentGridComponent', () => {
  let component: AgentGridComponent;
  let fixture: ComponentFixture<AgentGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
