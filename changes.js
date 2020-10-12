/*jshint esversion: 8 */
//this is for tests purpose and introduce chnanges in main
const tr = require('./locale');

tr.generate("uint16",3)
   .then((response) => {
      console.log(response);
   }).catch((err) => {
      console.log("error");
   });
