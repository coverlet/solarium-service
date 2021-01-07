import { cache } from '../utils/cache';
import fetch from 'node-fetch';
import { SPRITE_BASE_URL } from '../config/constants';

const fetchSpriteMap = () => {
  return fetch(SPRITE_BASE_URL + 'map.json')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cache.set(`map`, data, 120);

      return data;
    });
};

export const getSpriteMap = (): Promise<any> => {
  const map = cache.get(`map`);

  if (map) {
    return Promise.resolve(map);
  } else {
    return fetchSpriteMap();
  }
};
