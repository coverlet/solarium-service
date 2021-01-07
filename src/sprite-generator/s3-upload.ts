import fs from 'fs';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-central-1' });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const s3Upload = (options) => {
  fs.readFile(options.localFile, (err, data) => {
    if (err) throw err;
    const params = {
      ACL: 'public-read',
      Bucket: 'solarium-app',
      Key: `kbimages/${options.filename}`,
      Body: data,
      CacheControl: 'max-age=10243200',
    };
    const jsonParams = {
      ACL: 'public-read',
      Bucket: 'solarium-app',
      Key: `kbimages/map.json`,
      Body: JSON.stringify(options.json),
      CacheControl: 'max-age=43200',
    };

    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`image file uploaded at ${data.Location}`);
      s3.upload(jsonParams, function (s3Err, data) {
        if (s3Err) throw s3Err;
        console.log(`json file uploaded`);
      });
    });
  });
};
