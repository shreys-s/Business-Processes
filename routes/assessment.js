const express = require('express');
const router = express.Router();
const path = require('path');
var user = require('../utils/user'),
    quiz = require('../utils/quiz');

// Article Model
let Article = require('../models/article');
// User Model
let User = require('../models/user');
//Score Model
let Result = require('../models/result');
// Add Route
router.get('/', user.requiredAuthentication, function(req, res){
  Article.find(function(err, articles) {
      res.render('assessment', {
        title: 'Start Assessment',
      });
    });
});

 router.get('/category1', user.requiredAuthentication, function(req, res) {
          quiz.findUserQuestionsForToday(req.session.user._id, function(err, count) {
            quiz.findNextQuestion(count, function(err, question, total_questions) {
                if (question !== null) {
                    //Save answer with answer -1 to mark that the user has seen this question
                    quiz.saveAnswer(req.session.user._id, question._id, '-1', '0', function(err, record) {
                        req.session.question_id = question._id;
                        req.session.question_render_time = new Date();
                        res.render(category1, {
                            question: question,
                            question_index: count + 1,
                            total_questions: total_questions
                        });
                    });
                } else {
                    var today = new Date();
                    today.setHours(0, 0, 0, 0);
                    quiz.getResults(req.session.user._id, today, function(err, results) {
                        res.render(results, {
                            results: results
                        });
                    });
                }
            });
        });
    });

    /*
     * POST '/quiz/start'
     */

    router.post('/category1', function(req, res) {
        var response_time = (new Date() - req.session.question_render_time.toString().date()) / 1000,
            answer_choice = req.body.choice,
            is_fraud = false;
        answer_choice = (is_fraud) ? -99 : answer_choice;
        quiz.saveAnswer(req.session.user._id, req.session.question_id, answer_choice, response_time, function(err, record) {
            res.redirect('/');
        });
    });


module.exports = router;
