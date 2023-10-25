import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error = new BehaviorSubject<string>('');
  constructor() {
    this.error.next('');
  }
}
