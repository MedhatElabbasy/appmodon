import {
  Directive,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { take, tap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective {
  @Input() appRole: string[] = [];
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    this.checkAvailability();
  }

  checkAvailability() {
    let user = this.auth.snapshot.userIdentity;
    const allowed = user?.roles.filter((value) => this.appRole.includes(value));

    if (allowed?.length) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
