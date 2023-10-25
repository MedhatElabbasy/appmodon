import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineAddButtonComponent } from './line-add-button.component';

describe('LineAddButtonComponent', () => {
  let component: LineAddButtonComponent;
  let fixture: ComponentFixture<LineAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineAddButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
