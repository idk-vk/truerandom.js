/*jshint esversion: 8 */
  var https = require('https');
let truerandom = {};


truerandom.generate = function (type,length,size) {

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


// Function to execut main code


//   truerandom.generate('uint16',2)
//   .then(response => {

// console.log(response);

//   })
//   .catch(error => {
//     // handle error here
//   });





let tr = {};
tr.gen = function(digits){
	 let number = digits/5;
  return new Promise((resolve, reject) => {
  truerandom.generate('uint16',number)
  .then(response => {
let newarray = response.join('').split('');
newarray.length = digits;
 resolve(newarray.join(''));

  })
  .catch(error => {
    // handle error here
  });});
};




tr.gen(4)
  .then(response => {

console.log(response);

  })
  .catch(error => {
    // handle error here
  });