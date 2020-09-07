import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { environment } from '@env/environment';
import { AuthService } from '@app/services/auth/auth.service';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  appLogo = environment.APP_LOGO;

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private ngxLoader: NgxUiLoaderService,
  ) {
    this.registerForm = new FormGroup({
      firstname       : new FormControl('', [Validators.required]),
      lastname        : new FormControl('', [Validators.required]),
      email           : new FormControl('', [Validators.required]),
      phone           : new FormControl('', [Validators.required]),
      username        : new FormControl('', [Validators.required]),
      password        : new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required]),
      agree           : new FormControl('', [Validators.required])
    });
    if (this.auth.getCurrentUser()) {
      this.router.navigate(['/app']);
    }
  }

  ngOnInit(): void {
  }

  async register(value): Promise<void> {
    this.ngxLoader.start();
    this.auth.register(value).then(response => {
      if (response['success']) {
        const currentUser = {
          email: response['user']['email']
        }
        this.auth.sendVerificationEmail(currentUser).then(res => {
          this.ngxLoader.stop();
          if (res['success']) {
            this.toastr.success(res['message'], res['title']);
            this.router.navigate(['/auth/verification'], {queryParams: {id: this.globalService.getEncryptedHex(currentUser)}});
          } else {
            this.toastr.success(res['message'], res['title']);
          }
        });
      } else {
        this.toastr.error(response['message'], response['title']);
      }
    });
  }
}
