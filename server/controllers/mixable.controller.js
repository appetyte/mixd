import Mixable from '../models/mixable';

export const fromShelf = async (req, res, next) => {
  await Mixable.getFromeShelf(req.body.shelf);
  next();
}
