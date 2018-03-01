import Mixable from '../models/mixable';

export const fromShelf = (req, res) => {
  const shelf = req.query.shelf.split(',');
  Mixable.find({_id: {$in: shelf}}, (err, cursor) => {
    if (err) {
      // TODO: handle error
    } else {
      const recipes = new Set();
      const ingredients = [];

      cursor.forEach( ingredient => {
        ingredient['owns'] = true;
        ingredient.recipes.forEach( id => {
          recipes.add(id);
        });
        ingredients.push(ingredient);
      });

      const query = [
        {
          $match: {
            _id: {$in: Array.from(recipes)}
          }
        },
        {
          $bucket: {
            groupBy: {
              $subtract: [
                {$size: '$ingredients._id'},
                {$size: {$setIntersection: ['$ingredients._id', shelf]}},
              ]
            },
            boundaries: [0,1,2,3,4,5,6,7],
            default: "8+",
            output: {
              "count": { $sum: 1 },
              "recipeNames" : {
                $push: {
                  _id: '$_id',
                  missingIngredients: {
                    $setDifference: [
                      '$ingredients._id',
                      {$setIntersection: ['$ingredients._id', shelf]}
                    ]
                  }
                }
              }
            }
          }
        }
      ];

      Mixable.aggregate(query, (err2, cursor2) => {
        if (err2) {
          // TODO: Handle Error
        } else {
          res.json(cursor2);
        }
      });
    }
  });
};
