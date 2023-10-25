import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardSiteCardComponent } from './guard-site-card.component';

describe('GuardSiteCardComponent', () => {
  let component: GuardSiteCardComponent;
  let fixture: ComponentFixture<GuardSiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardSiteCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardSiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
