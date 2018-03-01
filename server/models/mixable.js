import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const mixableSchema = new Schema({
  _id: {
    type: String,
    unique: true,
  },
  ingredients: Array,
  recipes: Array
});

mixableSchema.statics.getFromShelf = shelf => (
  new Promise((resolve, reject) => {
    this.find({}, "_id", (err, cursor) => {
      if (err) return reject(err);
      resolve(cursor);
    });
  })
);

export default mongoose.model("Mixable", mixableSchema);
