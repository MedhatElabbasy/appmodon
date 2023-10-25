import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProposalComponent } from './post-proposal.component';

describe('PostProposalComponent', () => {
  let component: PostProposalComponent;
  let fixture: ComponentFixture<PostProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
