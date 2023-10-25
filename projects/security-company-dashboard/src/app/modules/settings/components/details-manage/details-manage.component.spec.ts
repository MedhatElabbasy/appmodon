import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsManageComponent } from './details-manage.component';

describe('DetailsManageComponent', () => {
  let component: DetailsManageComponent;
  let fixture: ComponentFixture<DetailsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
