import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, throwError } from 'rxjs';
import { switchMap, catchError, take, finalize, filter } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { AuthService } from '@app/services/auth/auth.service';
import { GlobalService } from '@app/services/global/global.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    public auth: AuthService,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | HttpEvent<any> | any> {
    return next.handle(this.addTokenToRequest(request, this.auth.getToken())).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        switch ((error as HttpErrorResponse).status) {
          case 400:
            return this.handle400Error(request, error, next);
          case 401:
            return this.handle401Error(request, error, next);
          case 403:
            return this.handle403Error(request, error, next);
          case 404:
            return this.handle404Error(request, error, next);
          case 422:
            return this.handle422Error(request, error, next);
          case 429:
            return this.handle429Error(request, error, next);
          case 500:
            return this.handle500Error(request, error, next);
          case 0:
            return this.handle500Error(request, error, next);
        }
      } else {
        return this.handleUnknownError(request, error, next);
      }
    }));
  }

  // Bad Request
  public handle400Error(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler) {
    this.ngxLoader.stop();
    this.ngxLoader.stopBackground();
    this.toastr.error(error['error']['message'] ? error['error']['message'] : 'Sorry, due an bad request data, we could not proccess your request at this time.', error['error']['title'] ? error['error']['title'] : 'Bad Request Data!');
    return throwError(error);
  }

  // Unauthorized Request
  public handle401Error(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler) {
    if (this.isRefreshingToken) {
      return this.tokenSubject.pipe(filter(token => token != null), take(1), switchMap(token => {
        return next.handle(this.addTokenToRequest(request, token));
      }),
        catchError(err => {
          return this.auth.logout() as any;
        }),
      );
    } else {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.auth.refreshToken().pipe(switchMap((response: any) => {
        if (response && response['success'] && response['_jwt'] !== undefined) {
          this.auth.tokenData = this.globalService.getDecrypted(response['_jwt']);
          localStorage.setItem('_td', response['_jwt']);

          this.auth.currentUser = this.globalService.getJwtUser(this.auth.tokenData['accessToken']);
          localStorage.setItem('_cu', this.globalService.getEncrypted(this.auth.currentUser));

          this.tokenSubject.next(this.auth.tokenData['accessToken']);
          return next.handle(
            this.addTokenToRequest(request, this.auth.tokenData['accessToken'])
          );
        }
      }),
        catchError(err => {
          this.isRefreshingToken = false;
          return this.auth.logout() as any;
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    }
  }

  // Forbidden Request
  public handle403Error(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler) {
    if (this.isRefreshingToken) {
      this.toastr.error(error['error']['message'] ? error['error']['message'] : 'Sorry, due an forbidden request, we could not proccess your request at this time.', error['error']['title'] ? error['error']['title'] : 'Forbidden Request!');
      return this.auth.logout() as any;
    } else {
      this.ngxLoader.stop();
      this.ngxLoader.stopBackground();
      this.toastr.error(error['error']['message'] ? error['error']['message'] : 'Sorry, due an forbidden request, we could not proccess your request at this time.', error['error']['title'] ? error['error']['title'] : 'Forbidden Request!');
      return throwError(error);
    }
  }

  // Not Found
  public handle404Error(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler) {
    this.ngxLoader.stop();
    this.ngxLoader.stopBackground();
    this.toastr.error(error['error']['message'] ? error['error']['message'] : 'Sorry, due to data not found, we could not proccess your request at this time.', error['error']['title'] ? error['error']['title'] : 'Data Not Found!');
    return throwError(error);
  }

  // Validation Error
  public handle422Error(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler) {
    this.ngxLoader.stop();
    this.ngxLoader.stopBackground();
    if (error['error']['error']) {
      error['error']['errors'].forEach(err => {
        this.toastr.error(err['msg'], error['error']['message']);
      });
    }
    return throwError(error);
  }

  public handle429Error(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler) {
    this.ngxLoader.stop();
    this.ngxLoader.stopBackground();
    this.toastr.error('You have exceeded the limit for login attempts.  Please try again in 15 minutes.  You can also click the Forgot/Change Password link.', 'Too Many Attempts');
    return throwError(error);
  }

  // Internal Server Error
  public handle500Error(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler) {
    this.ngxLoader.stop();
    this.ngxLoader.stopBackground();
    this.toastr.error(error['error']['message'] ? error['error']['message'] : 'Sorry, due to internal server error, we could not proccess your request at this time.', error['error']['title'] ? error['error']['title'] : 'Internal Server Error!');
    return throwError(error);
  }

  // Unknown Server Error
  public handleUnknownError(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler) {
    this.ngxLoader.stop();
    this.ngxLoader.stopBackground();
    this.toastr.error(error['error']['message'] ? error['error']['message'] : 'Sorry, due to internal server error, we could not proccess your request at this time.', error['error']['title'] ? error['error']['title'] : 'Internal Server Error!');
    return throwError(error);
  }

  // Add token to request
  public addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    } else {
      return request;
    }
  }
}
