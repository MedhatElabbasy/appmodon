import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBranchesUsersComponent } from './client-branches-users.component';

describe('ClientBranchesUsersComponent', () => {
  let component: ClientBranchesUsersComponent;
  let fixture: ComponentFixture<ClientBranchesUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBranchesUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBranchesUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
