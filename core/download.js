const fs = require("fs");
const path = require("path");
const http = require('follow-redirects').http;
const https = require('follow-redirects').https;

const request = ({ url, dest, ...options }) => new Promise((resolve, reject) => {
  const request = url.trim().startsWith('https') ? https : http;

  request
    .get(url, options, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        console.log(`failed to fetch ${dest}`)
        reject(new Error('Request Failed.\n' +
                         `Status Code: ${res.statusCode}`));

        return;
      }

      res.pipe(fs.createWriteStream(dest)).once('close', () => resolve({ filename: dest }));
    })
    .on('timeout', () => reject(new TimeoutError()))
    .on('error', reject);
});

const download = (options = {}) => {
  if (!options.url) {
    return Promise.reject(new Error("The options.url is required"));
  }

  if (!options.dest) {
    return Promise.reject(new Error("The options.dest is required"));
  }

  options = Object.assign({ extractFilename: true }, options);

  options.dest = path.join(options.dest, options.filename);
  return request(options);
};

module.exports = {
  download: download
}