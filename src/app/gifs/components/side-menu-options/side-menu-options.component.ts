import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../services/gif.service';
import type { MenuOption } from '../../interfaces/gif.menuOption.interface';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  gifServices = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'Lo mas popular',
    },
    {
      icon: 'fa-regular fa-rectangle-list',
      label: 'Masonry',
      route: '/dashboard/masonry',
      subLabel: 'Grupos de 3',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      route: '/dashboard/search',
      subLabel: 'Encuentra tu gif',
    },
  ];
}
