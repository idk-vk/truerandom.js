/*jshint esversion: 8 */
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
  else{
    number =digits;
  }
  return new Promise((resolve, reject) => {
  exports.generate('uint16',number)
  .then(response => {
let newarray = response.split('');
newarray.length = digits;

 resolve(newarray.join(''));

  })
  .catch(error => {
    console.log(error);
  });});
};

// code for digits

//=====================================================================


//code for getting random number between two numbers (ranged random)
exports.range= function(lower,upper){

  return new Promise((resolve, reject) => {
  exports.digits(4)
  .then(response => {
    console.log(response);
    let multiplier = response*(10**(-4));
    if (lower>upper) {
      diff = lower -upper;
    }
    else{
      diff = upper -lower;
    }
let random_number = lower + (diff)*multiplier;
console.log(random_number);
if (((random_number%1)>0.5)) {
  random_number = (random_number-(random_number%1))+1;
} else {
  random_number = (random_number-(random_number%1));
}
resolve(random_number);

  })
  .catch(error => {
    console.log(error);
  });});
};
// code for range

// code