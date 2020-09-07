import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '@app/services/auth/auth.service';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  verificationForm: FormGroup;

  user: any;
  token: string;
  code: string;
  showCodeForm = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private ngxLoader: NgxUiLoaderService,
  ) {
    if (this.auth.getCurrentUser()) {
      this.router.navigate(['/app']);
    } else {
      this.route.queryParams.subscribe(queryParam => {
        if (queryParam['id']) {
          this.user = this.globalService.getDecryptedHex(queryParam['id']);
          console.log(this.user);
          this.openCodeForm();
        } else if(queryParam['token']) {
          this.token = queryParam['token'];
          this.onVerifyEmail('TOKEN');
        } else {
          this.router.navigate(['auth/register']);
        }
      });
    }
  }

  ngOnInit(): void { }

  async onVerify(value) {
    this.code = value['code'];
    this.onVerifyEmail('CODE');
  }

  async onVerifyEmail(verificationType: string) {
    this.ngxLoader.start();
    if (verificationType && verificationType === 'TOKEN') {
      const _verificationData = {
        type: verificationType,
        token: this.token
      };
      this.auth.verifyEmail(_verificationData).then(response => {
        this.ngxLoader.stop();
        if (response['success']) {
          this.auth.unverifiedUser = null;
          this.router.navigate(['/auth/login']);
          this.toastr.success(response['message'], response['title']);
        } else {
          this.toastr.error(response['message'], response['title']);
        }
      });
    } else if (verificationType && verificationType === 'CODE') {
      const _verificationData = {
        type: verificationType,
        code: this.code,
        email: this.user['email']
      };
      this.auth.verifyEmail(_verificationData).then(response => {
        this.ngxLoader.stop();
        if (response['success']) {
          this.router.navigate(['/auth/login']);
          this.toastr.success(response['message'], response['title']);
        } else {
          this.toastr.error(response['message'], response['title']);
        }
      });
    }
  }

  async openCodeForm() {
    this.verificationForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
    this.showCodeForm = true;
  }
}
