import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

export interface IUser {
  _token: string;
  userId: string;
  isProfileComplete: boolean;
}

interface token {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  exp: number;
  iss: string;
  aud: string;
}

export class UserIdentity {
  private _roles: string[] = [];
  constructor(
    private _token: string,
    private userId: string,
    public isProfileComplete: boolean
  ) {
    if (this.role) {
      this._roles.push(this.role);
    }
  }

  get token(): string | null {
    if (helper.isTokenExpired(this._token)) {
      return null;
    } else {
      return this._token;
    }
  }

  addRole(role: string) {
    this._roles.push(role);
    this._roles = [...new Set(this._roles)];
  }

  get UserId() {
    return this.userId;
  }

  get roles() {
    return this._roles;
  }

  get role() {
    let _token: token | null = helper.decodeToken(this._token);
    if (_token) {
      return _token[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    }
    return;
  }
}

export function getRule(_token: string) {
  let token: token | null = helper.decodeToken(_token);
  if (token) {
    return token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
  return;
}
