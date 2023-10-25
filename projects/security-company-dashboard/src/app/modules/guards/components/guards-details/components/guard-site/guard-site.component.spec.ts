import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardSiteComponent } from './guard-site.component';

describe('GuardSiteComponent', () => {
  let component: GuardSiteComponent;
  let fixture: ComponentFixture<GuardSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
