import { fetchAppValidators } from '../client/validators-app';
import { cache } from '../utils/cache';

export const updateValidators = (): void => {
  fetchAppValidators('testnet').then(data => {
    console.log(data);

    // cache.set('testnet')
  })
};