import { fetchImages } from './fetch-images';
import { s3Upload } from './s3-upload';
import { getKeybaseList } from './get-keybase-list';
import Spritesmith from 'spritesmith';
import fs from 'fs';
import * as uuid from 'uuid';

const outputImageLocation = './output/image.png';

export const generateAvatarSprite = () => {
  // get list of unique keybase ids for testnet and mainnet
  getKeybaseList().then((ids) => {
    console.log(ids);
    ids = ['maricalucian','andrei'];
    console.log(`fetching avatars for ${ids.length} ids`);

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return;
    }

    // download keybase avatars for the list of images
    fetchImages(ids).then((images: any) => {
      console.log(`${images.length} avatars fetched`);

      Spritesmith.run(
        {
          src: images,
          algorithm: 'binary-tree',
        },
        function handleResult(err, result) {
          if (err) {
            console.error(err);
          }

          fs.writeFileSync(outputImageLocation, result.image);
          console.log(`sprite written to ${outputImageLocation}`);

          const filename = uuid.v1() + '.png';

          // const objectMap = {};
          // ids.forEach((keybaseId) => {
          //   if (result.coordinates[`./images/${keybaseId}.jpg`]) {
          //     objectMap[keybaseId] = {
          //       x: result.coordinates[`./images/${keybaseId}.jpg`].x,
          //       y: result.coordinates[`./images/${keybaseId}.jpg`].y,
          //     };
          //   }
          // });

          // console.log(`uploading file ${filename} and new map`);

          // s3Upload({
          //   localFile: outputImageLocation,
          //   filename,
          //   json: {
          //     filename,
          //     map: objectMap,
          //   },
          // });
        }
      );
    });
  });
};
