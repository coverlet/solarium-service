import NodeCache from 'node-cache';

const ttl = 60 * 60 * 24;

export const cache = new NodeCache({ stdTTL: ttl, checkperiod: ttl + 120 });
