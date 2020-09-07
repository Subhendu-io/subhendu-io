import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SHARED_MODULES, COMPONENT_DECLARATIONS } from '@app/app.common';

import { AuthGuard } from '@app/core/guard/auth.guard';
import { PipeModule } from '@app/pipes/pipe.module';

import { PrivateComponent } from '@app/private/private.component';
import { UsersComponent } from '@app/private/users/users.component';
import { ProfileComponent } from '@app/private/profile/profile.component';
import { DashboardComponent } from '@app/private/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'DEVELOPER', 'ADMIN'] },
    children: [
      {
        path: 'admin',
        canActivateChild: [AuthGuard],
        data: { roles: ['ADMIN'] },
        children: [
          { path: 'users', component: UsersComponent },
        ]
      },
      {
        path: 'developer',
        canActivateChild: [AuthGuard],
        data: { roles: ['DEVELOPER'] },
        children: [
          { path: 'users', component: UsersComponent },
        ]
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  }
];

export const appRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    PrivateComponent,
    DashboardComponent,
    UsersComponent,
    ProfileComponent
  ],
  imports: [
    ...SHARED_MODULES,
    appRouting,
    PipeModule,
    CommonModule
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    ...COMPONENT_DECLARATIONS
  ]
})
export class PrivateModule { }
