/*jshint esversion: 8 */
//this is for tests purpose and introduce chnanges in main
const tr = require('./locale');
tr.range(200,201)
.then(res=>{
   console.log(res);
})
.catch(err=>{
   console.log(err);
});
tr.digits(3)
.then(res=>{
   console.log(`${res} okkk`);
})
.catch(err=>{
   console.log(err);
});

