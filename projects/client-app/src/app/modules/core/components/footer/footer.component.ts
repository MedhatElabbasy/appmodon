import { Component, OnInit } from '@angular/core';
import { Routing } from '../../routes/app-routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  links = {
    privacyPolicy: `/${Routing. privacyPolicy}`,
    termsConditions:`/${Routing. termsConditions}`,
    postProposal:`/${Routing. postProposal}`,
    companies: `/${Routing.companies}`,
    faqs:`/${Routing. faqs}`,
    jobs:`/${Routing. jobs}`
  };
  constructor() {}

  ngOnInit(): void {}
}
