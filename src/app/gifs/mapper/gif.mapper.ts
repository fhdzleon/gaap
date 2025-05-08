import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interface';

export const mapGiphyItemToGif = (item: GiphyItem): Gif => {
  return {
    id: item.id,
    title: item.title,
    url: item.images.original.url,
  };
};

export const mapGiphyItemsToGifArray = (items: GiphyItem[]): Gif[] => {
  return items.map(mapGiphyItemToGif);
};
