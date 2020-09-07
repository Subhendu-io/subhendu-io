import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/services/auth/auth.service';
import { ApiService } from '@app/services/api/api.service';

import { environment } from '@env/environment';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  currentUser: any;
  isDeveloper: boolean;
  isPreDeveloper: boolean;

  logo = environment.APP_LOGO;
  title = 'Developer | ' + environment.COMPANY_NAME;

  activeTheme = 'light-theme';
  nextTheme = 'dark-theme';

  compactSidebar = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private api: ApiService,
  ) {
    this.currentUser = this.auth.getCurrentUser();
    this.isDeveloper = this.auth.hasRole('DEVELOPER');
    this.isPreDeveloper = this.auth.hasRole('PREDEVELOPER');
  }

  async ngOnInit() { }

  async onLogout() {
    this.auth.logout();
  }

  async onHola() {
    this.api.get('app').then(res => {
      console.log(res);
    });
  }
  async onSidebarChange() {
    this.compactSidebar = !this.compactSidebar;
  }
  async onThemeChange() {
    const bodyElement = document.body;
    if (bodyElement) {
      this.nextTheme = this.activeTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
      bodyElement.classList.remove(this.activeTheme);
      bodyElement.classList.add(this.nextTheme);
      this.activeTheme = this.nextTheme;
    }
  }
}
