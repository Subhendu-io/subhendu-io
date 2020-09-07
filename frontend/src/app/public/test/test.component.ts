import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '@app/services/api/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  appData: any;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  async ngOnInit(): Promise<void> {
    // this.ngxLoader.start();
    // this.api.get('app').then(response => {
    //   this.ngxLoader.stop();
    //   if (response['success']) {
    //     this.appData = response;
    //     this.toastr.success(response['message'], response['title']);
    //   } else {
    //     this.toastr.error(response['message'], response['title']);
    //   }
    // });
  }
}
