import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const mixableSchema = new Schema({
  _id: {
    type: String
  },
  type: {
    type: String
  },
  glassType: {
    type: String
  },
  category: {
    type: String
  },
  ingredients: Array,
  recipes: Array
});



mixableSchema.statics.fromShelf = function(shelf, cb) {
  const nodes = {};
  const links = [];
  let recipes = new Set();
  this.find({
    _id: {
      $in: shelf
    }
  }, (err, shelfIngredients) => {
    if (err) {
      // TODO: handle error
    } else {

      shelfIngredients.forEach(ing => {
        nodes[ing._id] = {
          name: ing._id,
          type: ing.type,
          glassType: ing.glassType || null,
          category: ing.category || null,
          recipesCount: ing.recipes.length,
          inShelf: true
        };

        ing.recipes.forEach(recipe => {
          links.push({
            source: ing._id,
            target: recipe
          });
          recipes.add(recipe);
        });

      });

      this.find({
        _id: {
          $in: Array.from(recipes)
        }
      }, (err, recDocs) => {
        const unownedIngredients = new Set();
        recDocs.forEach(recipe => {
          nodes[recipe._id] = {
            name: recipe._id,
            type: recipe.type,
            glassType: recipe.glassType || null,
            category: recipe.category || null,
            recipesCount: recipe.recipes.length,
            inShelf: false
          };
          recipe.ingredients.forEach(ing => {
            if (!nodes[ing._id]) {
              unownedIngredients.add(ing._id);
              links.push({
                source: ing._id,
                target: recipe._id
              });
            }
          });
        });
        this.find({
          _id: {
            $in: Array.from(unownedIngredients)
          }
        }, (err, neededIngredients) => {
          neededIngredients.forEach(ing => {
            nodes[ing._id] = {
              name: ing._id,
              type: ing.type,
              glassType: ing.glassType || null,
              category: ing.category || null,
              recipesCount: ing.recipes.filter(recipe => recipes.has(recipe)).length,
              inShelf: false
            };
          });
          cb(err, {
            nodes: Object.values(nodes),
            links
          });
        });
      });
    }
  });

  // this.find({
  //   _id: {
  //     $in: shelf
  //   }
  // }, (err, cursor) => {
  //   if (err) {
  //     // TODO: handle error
  //   } else {
  //     const recipes = new Set();
  //     const ingredients = [];
  //
  //     cursor.forEach(ingredient => {
  //       ingredient['owns'] = true;
  //       ingredient.recipes.forEach(id => {
  //         recipes.add(id);
  //       });
  //       ingredients.push(ingredient);
  //     });
  //
  //     const query = [{
  //         $match: {
  //           _id: {
  //             $in: Array.from(recipes)
  //           }
  //         }
  //       },
  //       {
  //         $bucket: {
  //           groupBy: {
  //             $subtract: [{
  //                 $size: '$ingredients._id'
  //               },
  //               {
  //                 $size: {
  //                   $setIntersection: ['$ingredients._id', shelf]
  //                 }
  //               },
  //             ]
  //           },
  //           boundaries: [0, 1, 2, 3, 4, 5, 6, 7],
  //           default: "8+",
  //           output: {
  //             "count": {
  //               $sum: 1
  //             },
  //             "recipeNames": {
  //               $push: {
  //                 _id: '$_id',
  //                 missingIngredients: {
  //                   $setDifference: [
  //                     '$ingredients._id',
  //                     {
  //                       $setIntersection: ['$ingredients._id', shelf]
  //                     }
  //                   ]
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     ];
  //     this.aggregate(query, cb);
  //   }
  // });
};

export default mongoose.model("Mixable", mixableSchema);
