import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { environment } from '@env/environment';
import { AuthService } from '@app/services/auth/auth.service';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  appLogo = environment.APP_LOGO;

  loginForm: FormGroup;
  currentUser: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private ngxLoader: NgxUiLoaderService,
  ) {
    this.currentUser = this.auth.getCurrentUser();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember_me: new FormControl('', [Validators.required]),
    });
    if (this.currentUser) {
      this.router.navigate(['/console']);
    }
  }

  ngOnInit(): void {
  }

  async login(value): Promise<void> {
    const _user = {
      email: value.email.trim().toLowerCase(),
      password: value.password.trim(),
      rememberMe: value.remember_me ? value.remember_me : false
    }
    this.ngxLoader.start();
    this.auth.login(_user).subscribe(response => {
      if (response['success']) {
        if (this.auth.unverifiedUser && this.auth.unverifiedUser['email']) {
          const _unverifiedUser = {
            email: this.auth.unverifiedUser['email']
          }
          this.auth.sendVerificationEmail(_unverifiedUser).then(res => {
            this.ngxLoader.stop();
            if (res['success']) {
              this.toastr.success(res['message'], res['title']);
              this.router.navigate(['/auth/verification'], {queryParams: {id: this.globalService.getEncryptedHex(_unverifiedUser)}});
            } else {
              this.toastr.success(res['message'], res['title']);
            }
          });
        } else {
          this.ngxLoader.stop();
          this.toastr.success(response['message'], response['title']);
          this.router.navigate(['/app/dashboard']);
        }
      } else {
        this.ngxLoader.stop();
        this.toastr.error(response['message'], response['title']);
      }
    });
  }
}
