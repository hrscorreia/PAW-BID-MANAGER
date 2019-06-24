
var express = require('express');
const userController = require("../controllers/userControllers");
const itemController = require("../controllers/itemControllers");
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path')
const createError = require('http-errors');

var storage = multer.diskStorage({
        destination: function(req, file, cb){
          cb(null, 'public/imagens/items');
        },
        filename: function (req, file, cb){
          cb(null, uuidv4() + path.extname(file.originalname))
        }
})
var upload = multer({
  storage: storage 
});

var router = express.Router();

var logged = function(req, res, next){
  if(req.isAuthenticated()){
    next();
  }
  else{
    next(createError(403));
  }
}

/* GET home page. */
router.get("/", function(req, res){
  var id = ''
  if(req.isAuthenticated()) id = req.user._id
  console.log('ajdiajdij');
  res.render("home", {userId: id}) 
} 
);

router.get("/register", function(req, res, next){
  res.redirect("/register.html");
});

router.get("/adicionarItem", logged, function(req, res, next){
  res.redirect("/adicionarItem.html");
});

router.post("/register",function(req, res, next){
  if(req.isAuthenticated()) next(createError(500));
  else{next()};
}, userController.register, function(req, res){
  res.redirect('/')
});

router.post("/save", upload.array('bla', 10), itemController.create, function(req, res){res.redirect('/me')});

//Faz render dos meus items
router.get("/me", logged, itemController.myItems, function(req, res){(res.render('me', {name: req.user.name, items: res.items, tokens: req.user.tokens, showWon: false}))});

//Faz render dos leiloes que eu ganhei
router.get("/me/won", logged,
  itemController.userWonAuctions,
   function(req, res){ 
     res.render('me', {name: req.user.name, items: res.items, tokens: req.user.tokens, showWon: true})
    },
);

router.post("/disable/:id", logged, itemController.deActivate, function(req, res){
  res.redirect('/me');
});

router.post('/me/generateApiToken', logged, userController.generateApiToken, function(req, res){
  res.redirect('/me');
})

router.get("/items", itemController.query, function(req, res){
  if(req.user)res.render('displayItems', {items: res.items, userId: req.user.id});
  else{res.render('displayItems', {items: res.items});}
});

router.get("/viewItem/:id",itemController.byID, function(req, res){
  res.render('viewItem', {item: res.item, userId: req.user._id});
});

router.post("/bid/:id",logged, itemController.bid, function(req, res){
  res.redirect("/viewItem/" + res.item.id);
});



module.exports = router
