const express = require('express');
const router = express.Router();

// Article Model
let Article = require('../models/article');
// User Model
let User = require('../models/user');
//Score Model
let Result = require('../models/result');
//General Questions Model
let General = require('../models/general');
// Add Route
router.get('/', ensureAuthenticated, function(req, res){
    Article.find(function(err, articles) {
      res.render('assessment', {
        title: 'Start Assessment',
      });
    });
});

router.get('/general', ensureAuthenticated, function(req, res){
  res.render('general', {
    title:'Basic Details of your Company'
  });
});

router.post('/general', ensureAuthenticated, function(req, res){
  req.checkBody('answer1','Answer1 is required').notEmpty();
  req.checkBody('answer2','Answer2 is required').notEmpty();
  req.checkBody('answer3','Answer3 is required').notEmpty();
  req.checkBody('answer4','Answer4 is required').notEmpty();
  req.checkBody('answer5','Answer5 is required').notEmpty();
  req.checkBody('answer6','Answer6 is required').notEmpty();
  req.checkBody('answer7','Answer7 is required').notEmpty();
  req.checkBody('answer8','Answer8 is required').notEmpty();
  req.checkBody('answer9','Answer9 is required').notEmpty();
  req.checkBody('answer10','Answer10 is required').notEmpty();


  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('general', {
      title:'Basic Details of your Company',
      errors:errors
    });
  } else {
    let general = new General();
    general.answer1 = req.body.answer1;
    general.answer2 = req.body.answer2;
    general.answer3 = req.body.answer3;
    general.answer4 = req.body.answer4;
    general.answer5 = req.body.answer5;
    general.answer6 = req.body.answer6;
    general.answer7 = req.body.answer7;
    general.answer8 = req.body.answer8;
    general.answer9 = req.body.answer9;
    general.answer10 = req.body.answer10;
  
    general.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','General Questionnaire Completed Successfully!');
        res.redirect('/assessment');
      }
    });
  }
});

router.get('/procuretopay', ensureAuthenticated, function(req, res){
      res.render('procuretopay', {
        title: 'Select Section',
      });
});

router.get('/procuretopay/purchasesection',ensureAuthenticated, function(req, res) {
    Article.find({},function(err,articles){
        if(err) res.json(err);
        else{
          res.render('purchasesection', {
          articles: articles
          });
        }
    });
});

router.get('/procuretopay/category1/data',ensureAuthenticated, function(req, res) {
    Article.find({'section' : 11},function(err,articles){
        if(err) res.json(err);
        else{
            res.send(articles)
        }
    });
});
router.get('/procuretopay/category2/data',ensureAuthenticated, function(req, res) {
    Article.find({'section' : 12},function(err,articles){
        if(err) res.json(err);
        else{
            res.send(articles)
        }
    });
});
router.get('/procuretopay/category3/data',ensureAuthenticated, function(req, res) {
    Article.find({'section' : 13},function(err,articles){
        if(err) res.json(err);
        else{
            res.send(articles)
        }
    });
});
router.get('/procuretopay/category4/data',ensureAuthenticated, function(req, res) {
    Article.find({'section' : 14},function(err,articles){
        if(err) res.json(err);
        else{
            res.send(articles)
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
