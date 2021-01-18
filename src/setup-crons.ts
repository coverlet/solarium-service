import cron from 'node-cron';
import { updateValidators } from './validators/index';
import { updateAvatarSprite } from './sprite-generator/index';

export const setupCrons = () => {
  // setup validators cache warmup
  cron.schedule('*/2 * * * *', () => {
    console.log('**cron starting validators cache update');
    updateValidators();
  });

  // setup avatar sprite refresh
  // run daily at 01:09
  cron.schedule('9 1 * * *', () => {
    console.log('**cron starting avatar update');
    updateAvatarSprite();
  });
};
