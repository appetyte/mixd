import Mixable from '../models/mixable';

export const fromShelf = (req, res) => {
  const shelf = req.query.shelf.split(',');
  Mixable.fromShelf(shelf, (err, cursor) => {
    res.json(cursor);
  });
};

export const show = (req, res) => {
  Mixable.find({_id: req.params.id}, (err, out) => {
    res.json(out);
  });
};
