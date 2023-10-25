import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfractionDetailsComponent } from './infraction-details.component';

describe('InfractionDetailsComponent', () => {
  let component: InfractionDetailsComponent;
  let fixture: ComponentFixture<InfractionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfractionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfractionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
