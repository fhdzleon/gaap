import { Component, inject } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'app-trending.page',
  imports: [ListComponent],
  templateUrl: './trending.page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
}
