import Mixable from '../models/mixable';

export const fromShelf = (req, res) => {
  const shelf = req.query.shelf.split(',');
  Mixable.fromShelf(shelf, cursor => {
    res.json(cursor);
  });
};
