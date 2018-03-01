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

export default mongoose.model("Mixable", mixableSchema);
