/*jshint esversion: 8 */
  const { log } = require('console');
var https = require('https');

//code for generate

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
            resolve(parsedData.join(""));

          } catch (e) {
            reject(e.message);
          }
        });
      }).on('error', (e) => {
        reject(`Got error: ${e.message}`);
      });

    });
  };

//code to generate

//=====================================================================

//code to digits(calculate n number of random digits )

exports.digits = function(digits){
  let number;
  if (digits>=5) {
    number = (digits/5)+1;
  }
  return new Promise((resolve, reject) => {
  exports.generate('uint16',number)
  .then(response => {
let newarray = response.join('').split('');
newarray.length = digits;
 resolve(newarray.join(''));

  })
  .catch(error => {
    console.log(error);
  });});
};

// code for digits

//=====================================================================


//code for