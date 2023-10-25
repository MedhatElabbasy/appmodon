import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { AuthResponse } from 'projects/tools/src/public-api';
import {
  BehaviorSubject,
  exhaustMap,
  map,
  Observable,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import * as lt from 'long-timeout';
import {
  CryptoService,
  IUser,
  OtpModel,
  OtpResponse,
  Roles,
  SecurityCompany,
  StorageKeys,
  UserIdentity,
  ValidateModel,
} from 'projects/tools/src/public-api';
import { Router } from '@angular/router';
import { Routing } from '../../core/routes/app-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();
  private readonly url = environment.api;
  private tokenExpirationTimer!: any;
  private allowed: string[] = [Roles.SecuritCompany, Roles.SecurityCompanyUser];
  userIdentity = new BehaviorSubject<UserIdentity | null>(null);
  userInfo = new BehaviorSubject<SecurityCompany | null>(null);
  snapshot!: {
    userIdentity: UserIdentity | null;
    userInfo: SecurityCompany | null;
  };

  constructor(
    private http: HttpClient,
    private crypto: CryptoService,
    private router: Router
  ) {
    this.snapshot = {
      userIdentity: null,
      userInfo: null,
    };
  }

  registerCompany(model: any) {
    return this.http.post(this.url + `api/SecurityCompany/Create`, model);
  }

  generateOTP(model: OtpModel): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(this.url + `auth/otp/generate`, model);
  }

  validate(model: ValidateModel): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.url + 'auth/otp/validate', model)
      .pipe(
        tap((response) => {
          this.handleAuthResponse(response);
        })
      );
  }

  handleAuthResponse(response: AuthResponse): void {
    const identity = new UserIdentity(
      response.id_token,
      response.userId,
      response.isProfileComplete
    );

    this.crypto.setEncryptedStorage(StorageKeys.uid, identity);
    this.updateIdentity(identity);
    this.getSecurityCompany();
    this.autoLogout(identity.token);
  }

  autoLogin() {
    let savedIdentity: IUser = this.crypto.getEncryptedStorage(StorageKeys.uid);
    if (savedIdentity) {
      const identity = new UserIdentity(
        savedIdentity._token,
        savedIdentity.userId,
        savedIdentity.isProfileComplete
      );
      if (identity.role) {
        if (!this.allowed.includes(identity.role)) {
          this.logout();
          this.router.navigate(['/' + Routing.unauthorized]);
        } else {
          this.updateIdentity(identity);
          this.getSecurityCompany();
          this.autoLogout(identity.token);
        }
      }
    } else {
      return;
    }
  }

  logout(): void {
    if (this.tokenExpirationTimer) {
      lt.clearTimeout(this.tokenExpirationTimer);
    }

    this.crypto.deleteEncryptedStorageByKey(StorageKeys.uid);
    this.userIdentity.next(null);
    this.userInfo.next(null);
    this.snapshot.userInfo = null;
    this.snapshot.userIdentity = null;
    this.router.navigate(['/']);
  }

  autoLogout(token: string | null): void {
    if (!token) {
      this.logout();
      return;
    }

    if (this.helper.isTokenExpired(token)) {
      this.logout();
      return;
    } else {
      let expiry: any = this.helper.getTokenExpirationDate(token)?.valueOf();
      let today = new Date().valueOf();
      let timeout = expiry - today;

      this.tokenExpirationTimer = lt.setTimeout(() => {
        this.logout();
      }, timeout);
    }
  }

  getSecurityCompany() {
    return this.http
      .get<SecurityCompany>(this.url + `api/SecurityCompany/get`)
      .pipe(
        tap((response) => {
          this.updateUserInfo(response);
        })
      );
  }

  updateIdentity(identity: UserIdentity): void {
    if (identity) {
      this.userIdentity.next(identity);
      this.snapshot.userIdentity = identity;
    }
  }

  updateUserInfo(info: SecurityCompany): void {
    if (info) {
      let user = this.snapshot.userIdentity!;
      let role = this.snapshot.userIdentity?.role;
      if (role == Roles.SecuritCompany) {
        user.addRole(Roles.VirtualAdmin);
      }

      if (role == Roles.SecurityCompanyUser) {
        if (info.securityCompanyBranch.isMainBranch) {
          user.addRole(Roles.VirtualAdmin);
        }
      }

      this.crypto.setEncryptedStorage(StorageKeys.uid, user);

      this.snapshot.userIdentity = user;

      this.userInfo.next(info);
      this.snapshot.userInfo = info;
    }
  }
  rejectedCompany(id: number) {
    return this.http.get(
      this.url + `api/SecurityCompany/GetAllReject?id=${id}`
    );
  }
}
