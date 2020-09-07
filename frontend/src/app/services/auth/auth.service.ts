import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { environment } from '@env/environment';
import { GlobalService } from '@app/services/global/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenData: any;
  public googleTokenData: any;
  public currentUser: any;
  public currentGoogleUser: any;
  public unverifiedUser: any;

  regUser: any;
  regGoogleUser: any;
  regGoogleToken: any;

  public redirectUrl = '';
  private api: string = environment.API;
  private endpoints: object = environment.ENDPOINTS;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private globalService: GlobalService,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  login(_user: object): Observable<any> {
    const credential = {
      email: _user['email'],
      password: this.globalService.getEncrypted(_user['password'])
    };
    return this.httpClient.post(this.api + this.endpoints['login'], credential)
      .pipe(map(response => {
        if (response && response['user'] && response['_jwt']) {
          const _tokenData = this.globalService.getDecrypted(response['_jwt']);
          const _currentUser = this.globalService.getJwtUser(_tokenData['accessToken']);
          if (_currentUser && _currentUser['verified']['email'] === false) {
            this.unverifiedUser = {
              email: _currentUser['email'],
              tokenData: _tokenData,
              currentUser: _currentUser,
            }
          } else {
            this.tokenData = _tokenData;
            this.currentUser = _currentUser;
            localStorage.setItem('_td', response['_jwt']);
            localStorage.setItem('_cu', this.globalService.getEncrypted(this.currentUser));
          }
        }
        return response;
      }), catchError(err => {
        this.ngxLoader.stop();
        return throwError(err);
      }));
  }
  register(_user: object): Promise<any> {
    const user = {
      email           : _user['email'],
      username        : _user['username'],
      firstname       : _user['firstname'],
      lastname        : _user['lastname'],
      phone           : _user['phone'],
      password        : this.globalService.getEncrypted(_user['password']),
      confirmPassword : this.globalService.getEncrypted(_user['confirmPassword']),
      agree           : _user['agree']
    };
    return this.httpClient.post(this.api + this.endpoints['register'], user).toPromise();
  }
  sendVerificationEmail(_user: object): Promise<any> {
    return this.httpClient.post(this.api + this.endpoints['sendVerificationEmail'], _user).toPromise();
  }
  verifyEmail(_verificationData: object): Promise<any> {
    return this.httpClient.post(this.api + this.endpoints['verifyEmail'], _verificationData).toPromise();
  }

  refreshToken(): Observable<any> {
    if (localStorage.getItem('_td')) {
      const tokenData = this.globalService.getDecrypted(localStorage.getItem('_td'));
      const token = {refreshToken: tokenData['refreshToken']};

      return this.httpClient.post(this.api + '/auth/token', this.globalService.getEncrypted(token));
    } else {
      return null;
    }
  }
  logout() {
    const encryptedTokenData = localStorage.getItem('_td');
    if (encryptedTokenData) {
      const tokenData = this.globalService.getDecrypted(encryptedTokenData);
      if (tokenData['refreshToken']) {
        this.destroySession(tokenData).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        });
      }
    }
    localStorage.removeItem('_cu');
    localStorage.removeItem('_td');
    localStorage.removeItem('_cgub');
    localStorage.removeItem('_gwt');
    this.tokenData = undefined;
    this.currentUser = undefined;
    this.googleTokenData = undefined;
    this.currentGoogleUser = undefined;
    this.toastr.success('Successfully logout from Customer Portal.', 'Logout successful');
    this.router.navigate(['auth/login']);
    this.ngxLoader.stop();
    this.ngxLoader.stopBackground();
  }
  destroySession(tokenData: object) {
    const token = {
      email: tokenData['loginUser']['email'],
      refreshToken: this.globalService.getEncrypted(tokenData['refreshToken'])
    };
    return this.httpClient.post(this.api + this.endpoints['logout'], token).toPromise();
  }

  getCurrentUser() {
    if (localStorage.getItem('_cu') != null) {
      const currentUser = this.currentUser ? this.currentUser : this.globalService.getDecrypted(localStorage.getItem('_cu'));
      return currentUser ? currentUser : false;
    }
    return false;
  }
  getToken() {
    if (localStorage.getItem('_td')) {
      const tokenData = this.tokenData ? this.tokenData : this.globalService.getDecrypted(localStorage.getItem('_td'));
      return tokenData ? tokenData.accessToken : false;
    }
    return false;
  }
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    if (user && user['roles']) {
      for (const userRole of user['roles']) {
        if (userRole.role === role) {
          return true;
        }
      }
    }
    return false;
  }
}
