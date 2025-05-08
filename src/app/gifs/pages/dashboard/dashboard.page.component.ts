import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'dashboard.page',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard.page.component.html',
})
export default class DashboardPageComponent {}
