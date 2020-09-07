import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from '@app/app.common';

import { PublicComponent } from '@app/public/public.component';
import { HomeComponent } from '@app/public/home/home.component';
import { TestComponent } from '@app/public/test/test.component';
import { LoginComponent } from '@app/public/login/login.component';
import { RegisterComponent } from '@app/public/register/register.component';
import { VerificationComponent } from '@app/public/verification/verification.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'auth',
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'verification', component: VerificationComponent },
        ]
      },
      { path: 'home', component: HomeComponent },
      { path: 'test', component: TestComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ]
  }
];
export const appRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    PublicComponent,
    TestComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    VerificationComponent
  ],
  imports: [
    ...SHARED_MODULES,
    appRouting,
    CommonModule,
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    ...COMPONENT_DECLARATIONS
  ]
})
export class PublicModule { }
