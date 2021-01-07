import { getValidators } from "../validators/get-validators";

const getValidatorsIds = (cluster) => {
  return getValidators(cluster).then((data) => {
      if (!data || !Array.isArray(data)) {
        return [];
      }
      return data
        .map((v) => {
          return v.keybase_id;
        })
        .filter((a) => !!a);
    });
};

export const getKeybaseList = () => {
  const promises = [getValidatorsIds('testnet'), getValidatorsIds('mainnet')];
  return Promise.all(promises).then((data) => {
    // get a list of unique keybase ids
    const ids = new Set([...data[0], ...data[1]]);

    return Array.from(ids);
  });
};
