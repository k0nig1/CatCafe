const { imageUrls } = require('./urls');

const sample = array => array[Math.floor(Math.random() * array.length)];

const url = `${sample(imageUrls)}`
console.log(url);