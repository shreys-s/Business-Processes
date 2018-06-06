const express = require('express');
const router = express.Router();

// Article Model
let Article = require('../models/article');
// User Model
let User = require('../models/user');
//Score Model
let Result = require('../models/result');
// Add Route
router.get('/', ensureAuthenticated, function(req, res){
    Article.find(function(err, articles) {
      res.render('assessment', {
        title: 'Start Assessment',
      });
    });
});

router.get('/category1',ensureAuthenticated, function(req, res) {
    Article.find({},function(err,articles,article,count){
        if(err) res.json(err);
        else {
        res.render('category1', {
        title:'Category 1 Questions',
        articles: articles,
        article: article,
        article_index: count+1
      });
    }
    });
});
// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
