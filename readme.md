
# TrueRandom.js

[![NPM](https://nodei.co/npm/truerandom.js.png)](https://npmjs.org/package/truerandom.js)

[![Build Status](https://travis-ci.org/idk-vk/truerandom.js.svg?branch=master)](https://travis-ci.org/idk-vk/truerandom.js)

TrueRandom.js is an utility node js library which provides truly random numbers using quantum randomness.

  - True random numbers generated in a lab by Australian National University delivered hot and fresh for your projects.
  - Numbers generated using measuring quantum fluctuations in a vaccum tube.
  - This is a non chaotic generator unlike other other generators which depends on atmospheric noises or pseudo randomness.

# New Features!

  - Generate 'n' numbers of random numbers, directly from the function
  - Generate Md5 with truly random salt
  - Generate SHA256 with truly random salt
  
Limitations:
  - Required internet connection (Fallback currently in development).


### Installation

TrueRandom.js requires [Node.js](https://nodejs.org/) v4+ to run.

Installing the module .
```sh
npm i truerandom.js
```

An example of how to use TrueRandom.js in your projects.

```sh
const tr = require('truerandom.js');

//Generating 2 unint16 numbers
  tr.generate('uint16',2)
  .then(response => {
  //Do whatever with your generated numbers
console.log(response+' -generated 2 uint16 numbers and then joined together');
  })
  .catch(error => {
    // handle error here
  });

  //Generating 'n' digits of random numbers
 tr.digits(20)
  .then(response => {
console.log(response+'-generated 20 digit random number');
  })
  .catch(error => {
    // handle error here
  });


  
```

### Usage
Currently  there are 2 functions available to use:
- generate
- digits

# #generate(type,number,blocksize) (function)
Used to generate 'n' number of a 'type' of random number. The result is a 'promise'.
So u must handle it properly using '.then' and catch errors.

Example code:
```
tr.generate('uint16',2)
  .then(response => {
  //Do whatever with your generated numbers
  })
  .catch(error => {
    // handle error here
  });
```
##### Parameters
the generate function takes 3 parameters

- type : the type of numbers requested
- number : the number of individual numbers requested
- blocksize :The length of a block. (Only needed for hex16)

#### type (parameter)
The generate function supports 3 type of numbers
- uint8 - it returns numbers that range from 0-255
- uint16 - it returns numbers that range from 0–65535
- hex16 - it returns hexa decimal numbers that range from 0000–ffff

#### number (parameter)
Anu (Australian national university) originally sends an array of the 'type' of number you chose(i.e - either uint8,uint16 or hex16). The 'number' parameter is actually the total no. of numbers you want in an array. TrueRandom.js then joins that array and gives you an string of number.

For example- if you use the following code:
```
tr.generate('uint8',2)
  .then(response => {
  //Do whatever with your generated numbers
  })
  .catch(error => {
    // handle error here
  });
```

Then the original response received by TrueRandom.js is
```
[219,172]
```
TrueRandom.js then further joins the array and returns a string similar to-
```
219172
```

Hence the number parameter is actually the length of the array requested which is directly proportional to the no. of digits of the random number generated.

**Broadly speaking the bigger no. you use in the number parameter the bigger random number will be generated**

#### Limitation
The maximum number you can use in the number parameter is 1024.
**Hence the number parameter must range from 1–1024**

#### Blocksize (parameter)
This parameter is **only necessary when requesting hex16** type of numbers.
It is the half length of the hex16 number u need in each array.
for example - 
```
tr.generate('hex16',1,10)
  .then(response => {
  //Do whatever with your generated numbers
  })
  .catch(error => {
    // handle error here
  });
```
will return 
```
fc3eebbbf3f6abade4b1  // size is 20 which is double the given length
```

while
```
tr.generate('hex16',1,25)
  .then(response => {
  //Do whatever with your generated numbers
  })
  .catch(error => {
    // handle error here
  });
```

will return
```
8665c4c7a9db220c483136a701c51a1f797bc5ae69a5de75de // size is 50 which is double the given length
```

#  digits (digits) (function) 
Used to generate 'n' digits of random numbers. The result is a ‘promise’.
So u must handle it properly using ‘.then’ and catch errors.

Example code:

```
tr.digits(20)
  .then(response => {
  //Do whatever with your generated numbers gives also the number of digits is 2
  })
  .catch(error => {
    // handle error here
  });

```

#### Parameters
the digits function takes  only one parameter
- Digits:Number of digit of random number to be generated

### digits(parameter)
This is the number of digits expected
**Cannot exceed more than 5124**




#  md5(message,salt digits) (#function) 
Used to generate a salted md5. The result is a ‘promise’.
So u must handle it properly using ‘.then’ and catch errors.

Example code:

```
tr.md5("Hi Bob",20)
  .then(response => {
  //Returns an array of 2 items. First is the md5 hash of the message and the second is the salt used
    })
  .catch(error => {
    // handle error here
  });

```
#### Response
the response is an array of 2 items
1. hashed message
2. Salt used to hash

#### Parameters
the digits function takes 2 parameter
- Message : Message to be hashed.
- Length of salt : Length of the truly random salt generated.

### Message(parameter)
Message to be hashed. Expected string.
### Length of salt(parameter)
length of the digits of hash to be used.
**Cannot exceed more than 5124**

#  sha1(message,salt digits) (#function) 
Used to generate a salted sha1. The result is a ‘promise’.
So u must handle it properly using ‘.then’ and catch errors.

Example code:

```
tr.sha1("Hi Bob",20)
  .then(response => {
  //Returns an array of 2 items. First is the sha1 hash of the message and the second is the salt used
    })
  .catch(error => {
    // handle error here
  });

```
#### Response
the response is an array of 2 items
1. hashed message
2. Salt used to hash

#### Parameters
the digits function takes 2 parameter
- Message : Message to be hashed.
- Length of salt : Length of the truly random salt generated.

### Message(parameter)
Message to be hashed. Expected string.
### Length of salt(parameter)
length of the digits of hash to be used.
**Cannot exceed more than 5124**

#  doubleHash(message,salt digits) (#function) 
Used to generate a salted doubleHash. The result is a ‘promise’.
So u must handle it properly using ‘.then’ and catch errors.

Example code:

```
tr.doubleHash("Hi Bob",20)
  .then(response => {
  //Returns an array of 2 items. First is the doubleHash hash of the message and the second is the salt used
    })
  .catch(error => {
    // handle error here
  });

```
#### Response
the response is an array of 2 items
1. hashed message
2. Salt used to hash

#### Parameters
the digits function takes 2 parameter
- Message : Message to be hashed.
- Length of salt : Length of the truly random salt generated.

### Message(parameter)
Message to be hashed. Expected string.
### Length of salt(parameter)
length of the digits of hash to be used.
**Cannot exceed more than 5124**


#  sha256(message,salt digits) (#function) 
Used to generate a salted sha256. The result is a ‘promise’.
So u must handle it properly using ‘.then’ and catch errors.

Example code:

```
tr.sha256("Hi Bob",20)
  .then(response => {
  //Returns an array of 2 items. First is the sha256 hash of the message and the second is the salt used
    })
  .catch(error => {
    // handle error here
  });

```
#### Response
the response is an array of 2 items
1.  hashed message
2. Salt used to hash

#### Parameters
the digits function takes 2 parameter
- Message : Message to be hashed.
- Length of salt : Length of the truly random salt generated.

### Message(parameter)
Message to be hashed. Expected string.
### Length of salt(parameter)
length of the digits of hash to be used. expeted number
**Cannot exceed more than 5124**







> This project requires contribution, if you are willing to support this project
> please don't be afraid to leave a message or make a pull request.
> Quality changes needs to be done in the documentation along with feature 
> addition and testing.
> I also encourage you to share your projects if you use this module in your projects
> I would be more than happy to feature them here.
 


### To-dos

 - Write MORE Tests
 - Make it less buggy
 - Make it reliable
 - Make demo apps
 - Support fallback for offline usage
 - Add more functions


License
----

MIT
