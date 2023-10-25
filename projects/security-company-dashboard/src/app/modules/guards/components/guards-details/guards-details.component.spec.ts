import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardsDetailsComponent } from './guards-details.component';

describe('GuardsDetailsComponent', () => {
  let component: GuardsDetailsComponent;
  let fixture: ComponentFixture<GuardsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
