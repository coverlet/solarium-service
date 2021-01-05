const { fetchImages } = require("./core/fetch-images");
const { s3Upload } = require("./core/s3-upload");
const { getKeybaseList } = require("./core/get-keybase-list");
const Spritesmith = require('spritesmith');
const fs = require("fs");
const uuid = require('uuid');

const outputImageLocation = './output/image.png';

const service = () => {

  // get list of unique keybase ids for testnet and mainnet
  getKeybaseList().then(ids => {
    console.log(`fetching avatars for ${ids.length} ids`);

    if(!ids || !Array.isArray(ids) || ids.length === 0) {
      return;
    }

    // download keybase avatars for the list of images
    fetchImages(ids).then((images) => {
      console.log(`${images.length} avatars fetched`);
  
      Spritesmith.run({
        src: images,
        algorithm: 'binary-tree'
      }, function handleResult (err, result) {
        if (err) {
          console.error(err);
        }
       
        fs.writeFileSync(outputImageLocation, result.image);
        console.log(`sprite written to ${outputImageLocation}`);
  
        const filename = uuid.v1() + '.png';
  
        const objectMap = {};
        ids.forEach(keybaseId => {
          if(result.coordinates[`./images/${keybaseId}.jpg`]) {
            objectMap[keybaseId] = {
              x: result.coordinates[`./images/${keybaseId}.jpg`].x,
              y: result.coordinates[`./images/${keybaseId}.jpg`].y
            }
          }
        });


        console.log(`uploading file ${filename} and new map`);
  
        s3Upload({
          localFile: outputImageLocation,
          filename,
          json: {
            filename,
            map: objectMap
          }
        })  
      });
    })
  });
}

module.exports = {
  startService: () => {
    // setInterval(() => {
    //   console.log(getKeybaseList());
    // }, 20000);

    service();
  },
};
