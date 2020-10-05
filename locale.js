/*jshint esversion: 8 */
  var https = require('https');
// let truerandom = {};


exports.generate = function (type,length,size) {

  return new Promise((resolve, reject) => {
      https.get('https://qrng.anu.edu.au/API/jsonI.php?length='+length+'&type='+type+'&size='+size, (res) => {
        var { statusCode } = res;
        var contentType = res.headers['content-type'];

        let error;

        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
        }

        if (error) {
          console.error(error.message);
          // consume response data to free up memory
          res.resume();
        }

        res.setEncoding('utf8');
        let rawData = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData).data;
            //Sending string or an array
            resolve(parsedData);

          } catch (e) {
            reject(e.message);
          }
        });
      }).on('error', (e) => {
        reject(`Got error: ${e.message}`);
      });

    });
  };

