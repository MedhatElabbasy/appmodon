import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static noSpace(control: AbstractControl): ValidationErrors | null {
    if (control?.value?.trim() == '') {
      return { noSpace: true };
    } else {
      return null;
    }
  }
}
