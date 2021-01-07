import { fetchAppValidators } from '../client/validators-app';
import { getSpriteMap } from '../sprite-generator/get-map';
import { IValidatorInfo } from '../types';
import { cache } from '../utils/cache';

// fetches validators from validators app
export const fetchAndCacheValidators = (cluster): Promise<IValidatorInfo[]> => {
  return fetchAppValidators(cluster).then((validators) => {
    // add avatar info
    return getSpriteMap().then((data) => {

      validators.forEach((validator) => {
        if (validator.keybase_id && data.map[validator.keybase_id]) {
          validator.pic = {
            file: data.filename,
            x: data.map[validator.keybase_id].x,
            y: data.map[validator.keybase_id].y,
          };
        }
      });

      cache.set(`validators_${cluster}`, validators);
      console.log(`${validators.length} saved in cache validators_${cluster}`);

      return validators;
    });
  });
};

// fetchs validators from cache or validators app
export const getValidators = (cluster): Promise<IValidatorInfo[]> => {
  const validators = cache.get(`validators_${cluster}`) as IValidatorInfo[];

  if (validators) {
    return Promise.resolve(validators);
  } else {
    return fetchAndCacheValidators(cluster);
  }
};
