import { Component, inject, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { GifService } from '../../services/gif.service';
import type { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search.page',
  imports: [ListComponent],
  templateUrl: './search.page.component.html',
})
export default class SearchPageComponent {
  gifSearchService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifSearchService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    });
  }
}
