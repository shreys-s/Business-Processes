const express = require('express');
const router = express.Router();

// Article Model
let Article = require('../models/article');
let User = require('../models/user');
// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else {
      res.render('add_article', {
        title:'Add Question',
        articles: articles
      });
    }
  });
});
// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title','Title is required').notEmpty();
  req.checkBody('tchoice1','Choice is required').notEmpty();
  req.checkBody('tchoice2','Choice is required').notEmpty();
  req.checkBody('tchoice3','Choice is required').notEmpty();
  req.checkBody('answer','Answer is required').notEmpty();
  req.checkBody('weight','Weight of the Question is required').notEmpty();
  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_article', {
      title:'Add Article',
      errors:errors
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.choice1.title = req.body.tchoice1;
    article.choice1.next_id = req.body.nextid1;
    article.choice1.weight = req.body.wchoice1;
    article.choice2.title = req.body.tchoice2;
    article.choice2.next_id = req.body.nextid2;
    article.choice2.weight = req.body.wchoice2;
    article.choice3.title = req.body.tchoice3;
    article.choice3.next_id = req.body.nextid3;
    article.choice3.weight = req.body.wchoice3;
    article.answer = req.body.answer;
    article.weight = req.body.weight;
    article.category = req.body.category;
    article.author = req.user._id;
    article.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Article Added');
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('edit_article', {
      title:'Edit Article',
      article:article
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;

  let query = {_id:req.params.id}

  Article.update(query, article, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Article Updated');
      res.redirect('/');
    }
  });
});

// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      res.status(500).send();
    } else {
      Article.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

// Get Single Article
router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    User.findById(article.author, function(err, user){
      res.render('article', {
        article:article,
        author: user.name
      });
    });
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
