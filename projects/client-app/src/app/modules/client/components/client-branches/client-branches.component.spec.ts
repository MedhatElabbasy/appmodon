import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBranchesComponent } from './client-branches.component';

describe('ClientBranchesComponent', () => {
  let component: ClientBranchesComponent;
  let fixture: ComponentFixture<ClientBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBranchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
