/*jshint esversion: 8 */
//this is for tests purpose and introduce chnanges in main
const tr = require('./locale');
tr.range(202,203)
.then(res=>{
   console.log(res);
})
.catch(err=>{
   console.log(err);
});

