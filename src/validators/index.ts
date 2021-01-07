import { fetchAndCacheValidators } from './get-validators';

export const updateValidators = (): void => {
  fetchAndCacheValidators('testnet').then(() => {
    fetchAndCacheValidators('mainnet');
  });
};
