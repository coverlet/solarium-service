import { download } from './download';

const simultanDownloads = 5;

const fetchImage = (keybaseName) => {
  const url = `https://keybase.io/${keybaseName}/picture?format=square_40`;

  return download({
    url: url,
    dest: './images',
    filename: `${keybaseName}.jpg`,
  });
};

export const fetchImages = async (list) => {
  let promises = [];
  let images = [];

  return new Promise(async (resolve) => {
    let i = 0;
    while (i < list.length) {
      promises.push(fetchImage(list[i]));

      if (promises.length % simultanDownloads === 0 || i >= list.length - 1) {
        await Promise.all(promises.map((p) => p.catch((e) => e))).then((data) => {
          images = images.concat(
            data.filter((res) => res.filename).map((res) => './' + res.filename)
          );
        });
        promises = [];
      }

      i++;
    }

    resolve(images);
  });
};
