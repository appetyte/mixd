import Mixable from '../models/mixable';

export const fromShelf = (req, res) => {
  const shelf = unescape(req.query.shelf).split(',');
  Mixable.fromShelf(shelf, (err, cursor) => {
    res.json(cursor);
  });
};

export const show = (req, res) => {
  Mixable.find(
    {_id: unescape(req.params.id)},
    {recipes: 0},
    (err, out) => {
      res.json(out);
    }
  );
};
