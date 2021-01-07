import { VALIDATORS_APP_URL } from '../config/constants';
import { IValidatorInfo } from '../types';
import { HttpClient } from '../utils/http-client';

const validatorsAppClient = new HttpClient(VALIDATORS_APP_URL, {
  headers: {
    Token: process.env.VALIDATORS_APP_TOKEN,
  },
});

export const fetchAppValidators = (cluster: string): Promise<IValidatorInfo[]> => {
  return validatorsAppClient.get(`validators/${cluster}.json`).then((data) => {
    return data.reduce((acc: IValidatorInfo[], val: IValidatorInfo) => {
      !acc.some((v: IValidatorInfo) => {
        return val.account === v.account;
      }) && acc.push(val);
      return acc;
    }, []);
  });
};
