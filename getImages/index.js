const axios = require('axios');
const fs = require('fs');

const images = [];

// axios.get('https://api.thecatapi.com/v1/images/search')
//     .then(function (response) {
//         // console.log(response.data);
//         images.push(response.data);
//     })
//     .catch((error) => {
//         console.log(`Error: ${error}`)
//     })

// const getImageData = async () => {
//     try {
//         const response = await axios.get('https://api.thecatapi.com/v1/images/search');
//         // images.push(response.data);
//         console.log(response.data.url);
//     }
//     catch (ex) {
//         console.error(ex);
//     }
// }
// getImageData();

// const run = async () => {
//     for (var i = 0; i < 40; i++) {
//         await getImageData();
//     }
//     for (let image of images) {
//         console.log(image.url);
//     }
// }

// run();

var rawData = fs.readFileSync('cat_images.json');
var imagedata = JSON.parse(rawData);
// console.log(imagedata);
for (let data of imagedata) {
    images.push(data[0].url);
    // console.log(data[0].url);
}

var outData = JSON.stringify(images);
fs.writeFileSync('url.json', outData);

// console.log(images);
