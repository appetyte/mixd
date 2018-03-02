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

mixableSchema.statics.fromShelf = function(shelf, cb) {
  this.find({
    _id: {
      $in: shelf
    }
  }, (err, cursor) => {
    if (err) {
      // TODO: handle error
    } else {
      const recipes = new Set();
      const ingredients = [];

      cursor.forEach(ingredient => {
        ingredient['owns'] = true;
        ingredient.recipes.forEach(id => {
          recipes.add(id);
        });
        ingredients.push(ingredient);
      });

      const query = [{
          $match: {
            _id: {
              $in: Array.from(recipes)
            }
          }
        },
        {
          $bucket: {
            groupBy: {
              $subtract: [{
                  $size: '$ingredients._id'
                },
                {
                  $size: {
                    $setIntersection: ['$ingredients._id', shelf]
                  }
                },
              ]
            },
            boundaries: [0, 1, 2, 3, 4, 5, 6, 7],
            default: "8+",
            output: {
              "count": {
                $sum: 1
              },
              "recipeNames": {
                $push: {
                  _id: '$_id',
                  missingIngredients: {
                    $setDifference: [
                      '$ingredients._id',
                      {
                        $setIntersection: ['$ingredients._id', shelf]
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      ];
      this.aggregate(query, cb);
    }
  });
};

export default mongoose.model("Mixable", mixableSchema);
