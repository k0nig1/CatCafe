const mongoose = require('mongoose');
const cities = require('./cities');
const { names, breeds } = require('./seedHelpers');
const Cat = require('../models/cat');
const { imageUrls } = require('./urls');

mongoose.connect('mongodb://localhost:27017/CatCafe');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Cat.deleteMany({});
    for (let i = 0; i < 38; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const age = Math.floor(Math.random() * 12) + 1;
        const cat = new Cat({
            //YOUR USER ID
            author: '5f5c330c2cd79d538f2c66d9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            name: `${sample(names)}`,
            breed: `${sample(breeds)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            age,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            imageUrl: `${sample(imageUrls)}`
        })
        await cat.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})