import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from '@app/services/auth/auth.service';
import { AuthInterceptor } from '@app/services/auth/auth.interceptor';

import { SHARED_MODULES } from '@app/app.common';
import { AppRoutes } from '@app/app.routes';
import { ServicesModule } from '@app/services/services.module';

import { AppComponent } from '@app/app.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...SHARED_MODULES,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ServicesModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      delay: 0,
      minTime: 0,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
