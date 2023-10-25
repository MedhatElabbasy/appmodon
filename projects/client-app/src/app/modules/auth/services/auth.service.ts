import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'projects/client-app/src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SecurityGuard } from '../models/security-guard.model';
import * as lt from 'long-timeout';

import {
  AuthResponse,
  ClientCompany,
  CryptoService,
  IUser,
  OtpModel,
  OtpResponse,
  Roles,
  StorageKeys,
  UserIdentity,
  ValidateModel,
} from 'projects/tools/src/public-api';
import { Router } from '@angular/router';
import { ClientBranchUser } from '../../client/models/client-branch-user';
import { Routing } from '../../core/routes/app-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();
  private readonly url = environment.api;
  private tokenExpirationTimer!: any;
  userIdentity = new BehaviorSubject<UserIdentity | null>(null);
  userInfo = new BehaviorSubject<
    SecurityGuard | ClientCompany | ClientBranchUser | null
  >(null);
  snapshot!: {
    userIdentity: UserIdentity | null;
    userInfo: SecurityGuard | ClientCompany | ClientBranchUser | null;
  };
  chosenCopmanyID = new BehaviorSubject(null);

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

  registerSecurityGuard(model: any): Observable<SecurityGuard> {
    return this.http.post<SecurityGuard>(
      this.url + 'api/SecurityGuard/Create',
      model
    );
  }

  registerClientCompany(model: any): Observable<ClientCompany> {
    return this.http.post<ClientCompany>(
      this.url + 'api/ClientCompany/Create',
      model
    );
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
    this.autoLogout(identity.token);
  }

  logout(): void {
    this.Navigate();
    //location.reload();
    // this.router.navigate(['/home']).then(() => {
    //   location.reload();
    // });
    location.href = '#/home';
  }

  Navigate() {
    
    if (this.tokenExpirationTimer) {
      lt.clearTimeout(this.tokenExpirationTimer);
    }
    console.log("true");

    this.userIdentity.next(null);
    this.userInfo.next(null);
    this.crypto.deleteEncryptedStorageByKey(StorageKeys.uid);
    // this.userIdentity.subscribe((res: any) => {
    //   this.autoLogout(res?.token)
    // })

  }

  autoLogin() {
    let savedIdentity: IUser = this.crypto.getEncryptedStorage(StorageKeys.uid);
    if (savedIdentity) {
      const identity = new UserIdentity(
        savedIdentity._token,
        savedIdentity.userId,
        savedIdentity.isProfileComplete
      );
      this.updateIdentity(identity);
      this.getInfoBasedOnRole(identity);
      console.log("autologin");
      //this.router.navigate([`/${Routing.companies}`]);
      this.autoLogout(identity.token);
    } else {
      return;
    }
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

  getClientInfo() {
    this.http
      .get<ClientCompany>(this.url + `api/ClientCompany`)
      .subscribe((response: any) => {
        this.updateUserInfo(response);
        console.log(response);
      });
  }

  getUser(): Observable<ClientCompany> {
    return this.http.get<ClientCompany>(this.url + `api/ClientCompany`);
  }

  getGuardInfo() {
    this.http
      .get<SecurityGuard>(this.url + `api/SecurityGuard`)
      .subscribe((response: any) => {
        this.updateUserInfo(response);
      });
  }

  getClientUser(identity: UserIdentity) {
    this.http
      .get<ClientBranchUser>(
        this.url + `api/ClientCompanyUser/Get?Id=${identity.UserId}`
      )
      .subscribe((response) => {
        this.updateUserInfo(response);
      });
  }

  getInfoBasedOnRole(identity: UserIdentity) {
    console.log(identity.role);

    if (identity.role == Roles.SecurityGurd) {
      this.getGuardInfo();
    }

    if (identity.role == Roles.Company) {
      this.getClientInfo();
    }

    if (identity.role == Roles.ClientCompanyUser) {
      this.getClientUser(identity);
    }
  }

  updateIdentity(identity: UserIdentity): void {
    if (identity) {
      if (identity.role == Roles.Company) {
        identity.addRole(Roles.VirtualClientAdmin);
      }

      if (identity.role == Roles.ClientCompanyUser) {
      }

      this.userIdentity.next(identity);
      this.snapshot.userIdentity = identity;
    }
  }

  updateUserInfo(info: SecurityGuard | ClientCompany | ClientBranchUser): void {
    if (info) {
      let user = this.snapshot.userIdentity!;
      let role = this.snapshot.userIdentity?.role;

      if (role == Roles.Company) {
        user.addRole(Roles.VirtualClientAdmin);
      }

      if (role == Roles.ClientCompanyUser) {
        if ((info as ClientBranchUser).clientCompanyBranch.isMainBranch) {
          user.addRole(Roles.VirtualClientAdmin);
        }
      }
      console.log("0000000000000000000000000000000000");
      console.log(info);
      console.log(user);
      console.log(role);
      console.log("0000000000000000000000000000000000");




      this.userInfo.next(info);

      this.snapshot.userInfo = info;
    }
  }

  getAllSecurityCompaniesByClientId(clientID: number, page: number, pageSize: number) {
    return this.http.get(this.url + `api/SecurityCompanyClients/GetAllByClientId?ClientId=${clientID}&page=${page}&pageSize=${pageSize}`)
  }
}
