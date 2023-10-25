import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LangService } from 'projects/tools/src/public-api';
import { PostPorposalService } from '../../services/post-porposal.service';

@Component({
  selector: 'app-post-proposal',
  templateUrl: './post-proposal.component.html',
  styleUrls: ['./post-proposal.component.scss'],
})
export class PostProposalComponent implements OnInit {
  postForm: FormGroup = this.fb.group({
    fullName: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(^[A-Za-z\u0621-\u064A]{3,16})([ ]{0,1})([A-Za-z\u0621-\u064A]{3,16})?([ ]{0,1})?([A-Za-z\u0621-\u064A]{3,16})?([ ]{0,1})?([A-Za-z\u0621-\u064A]{3,16})$/
        ),
      ],
    ],
    fullNameEN: [''],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
    description: [
      '',
      [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(10),
      ],
    ],
    descriptionEN: [
      '',
      [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(10),
      ],
    ],
  });
  constructor(
    public lang: LangService,
    private fb: FormBuilder,
    private _PostPorposalService: PostPorposalService
  ) {}

  ngOnInit(): void {}
  send(postForm: FormGroup) {
    this.postForm.controls['fullNameEN'].setValue(
      this.postForm.controls['fullName'].value
    );
    this._PostPorposalService.addPorposal(postForm).subscribe((res) => {
      if (res) {
        location.reload();
      }
    });
  }
}
