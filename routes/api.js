var express = require("express");
var router = express.Router();
var passport = require('passport');
const itemController = require("../controllers/itemControllers");



router.get("/items/mine", passport.authenticate('jwt', {session:false}) , itemController.myItems,
function(req, res){
  res.json(res.items);
});

router.get('/items/:id', itemController.byID, function(req, res){
  res.json(res.item);
});
router.get('/items', itemController.query,function(req,res,next){
  res.json(res.items);
});

router.post('/items/:id/', passport.authenticate('jwt', {session:false}), itemController.bid, function(req, res){
  res.json(res.item);
});

module.exports = router;