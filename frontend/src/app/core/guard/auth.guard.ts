import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const curUser = this.auth.getCurrentUser();
    const routeRoles = route.data.roles;
    const url: string = state.url;

    if (curUser) {
        if (!routeRoles || routeRoles.length === 0) {
          return true;
        } else {
          for (const roles of curUser.roles) {
            // check if route is restricted by role
            if (routeRoles && routeRoles.indexOf(roles.role) > -1) {
              // role not authorized so redirect to home page
              return true;
            }
          }
        }
        // logged in so return true
        this.toastr.warning('Sorry, you do not have access to this route', 'Access Denied!');
        this.router.navigate(['/']);
        return false;
    } else {
      // Store the attempted URL for redirecting
      this.auth.redirectUrl = url;
      this.toastr.warning('Sorry, you do not have access to this route', 'Access Denied!');

      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const curUser = this.auth.getCurrentUser();
      const routeRoles = route.data.roles;
      const url: string = state.url;
      if (curUser) {
          if (!routeRoles || routeRoles.length === 0) {
            return true;
          } else {
            for (const roles of curUser.roles) {
              // check if route is restricted by role
              if (routeRoles && routeRoles.indexOf(roles.role) > -1) {
                // role not authorized so redirect to home page
                return true;
              }
            }
          }
          // logged in so return true
          this.toastr.warning('You are not authorized to this route.', 'Unauthorized User!');
          this.router.navigate(['/app/dashboard']);
          return false;
      } else {
        return false;
      }
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
