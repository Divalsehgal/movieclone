const express = require("express");
const router = express.Router();
const { Favourite } = require("../models/Favourite");

const { auth } = require("../middleware/auth");

router.post(`/favoriteNumber`, (req, res) => {
  Favourite.find({ movieId: req.body.movieId }).exec((error, favourite) => {
    if (error) res.status(400).send(error);
    else
      res
        .status(200)
        .json({ success: true, favouriteNumber: favourite.length });
  });
});

router.post(`/favorited`, (req, res) => {
  Favourite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((error, favourite) => {
    if (error) res.status(400).send(error);
    let result = false;
    if (favourite.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favourited: result });
  });
});

router.post(`/addToFavorite`, (req, res) => {
  const favorite = new Favourite(req.body);
  favorite.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

router.post(`/removeFromFavorite`, (req, res) => {
  Favourite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    } else {
      return res.status(200).json({ success: true, doc });
    }
  });
});

router.post(`/getFavouriteMovie`, (req, res) => {
  Favourite.find({
    userFrom: req.body.userFrom,
  }).exec((err, favourites) => {
    if (err) res.status(400).send(err)
    else res.status(200).json({ success: true, favourites });
  });
});

module.exports = router;
