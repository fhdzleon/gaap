import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { mapGiphyItemsToGifArray } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, tap } from 'rxjs';

const loadFromlocalStorage = () => {
  const gifsFromlocalStorage = localStorage.getItem('searchHistory') ?? '{}';
  const gifs = JSON.parse(gifsFromlocalStorage);
  return gifs;
};

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private hhtp = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendigGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGigGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromlocalStorage());

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  searchedGifs = signal<Gif[]>([]);

  constructor() {
    this.loadTrendingGifs();

    effect(() => {
      const currentHistory = this.searchHistory();
      localStorage.setItem('searchHistory', JSON.stringify(currentHistory));
    });
  }

  loadTrendingGifs() {
    if (this.trendigGifsLoading()) return;

    this.trendigGifsLoading.set(true);

    this.hhtp
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((resp) => {
        const gifs = mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update((currentsGifts) => [
          ...currentsGifts,
          ...gifs,
        ]);
        this.trendingPage.update((current) => current + 1);
        this.trendigGifsLoading.set(false);
      });
  }

  //! Con observable -->

  searchGifs(query: string) {
    return this.hhtp
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: 18,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => mapGiphyItemsToGifArray(items)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            [query.toLowerCase()]: items,
            ...history,
          }));
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
