const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: String,
  breed: String,
  imageUrl: String,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      // required: true
    },
    coordinates: {
      type: [Number],
      // required: true
    }
  },
  age: Number,
  description: String,
  location: String,
  // author: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  // reviews: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Review'
  //   }
  // ]
});

module.exports = mongoose.model('Cat', catSchema);
