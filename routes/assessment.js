const express = require('express');
const router = express.Router();
const path = require('path');

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
          findUserQuestionsForToday(req.session.user._id, function(err, count) {
            findNextQuestion(count, function(err, question, total_questions) {
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

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}
/**
 * Finds all the questions in the quiz history collection for the user for today.
 * Returns a count of all matching quiz history items.
 *
 * @param {String} user ID.
 * @param {Function} callback.
 * @api public
 */

function findUserQuestionsForToday(user_id, fn) {
    var start_day = new Date();
    start_day.setHours(0, 0, 0, 0);
    models.Score.count({
        user_id: user_id,
        date: {
            $gte: start_day
        }
    }, function(err, count) {
        if (err) throw err;
        return fn(null, count);
    });
}

/**
 * Finds next question to display to user.
 * Returns the full Question document and total number of questions today.
 *
 * @param {String} nth question to display sorted by date.
 * @param {Function} callback.
 * @api public
 */

function findNextQuestion(index, fn) {
    var start_day = new Date();
    start_day.setHours(0, 0, 0, 0);
    var query = models.Question.find({
        date: {
            $gte: start_day
        }
    });
    query.sort({
        date: 1
    });
    query.exec(function(err, questions) {
        if (err) throw err;
        if (questions.length == 0) {
            //No quiz today!
            return fn(new Error('No Questions Available'), null, null);
        }
        if (index >= questions.length) {
            //No more questions in the quiz!
            return fn(null, null, null);
        } else {
            return fn(null, questions[index], questions.length);
        }
    });
}


function getResults(user_id, start_day, fn) {
    var results = [],
        total_points = 0,
        total_questions = 0,
        total_response_time = 0;
    var to_find = {
        user_id: user_id,
        date: {
            $gte: start_day
        }
    };
    if (!start_day) {
        delete to_find.date;
    }
    var history_query = models.QuizHistory.find(to_find);
    history_query.sort({
        date: 1
    });
    history_query.populate('question'); //Mongo equivalent of a RDBMS JOIN. Isn't she beautiful?!
    history_query.select('question choice_id response_time');
    history_query.lean();
    history_query.exec(function(err, questions) {
        var correct_answer = false;
        if (questions !== undefined) {
            questions.forEach(function(item, index, array) {
                total_questions++;
                if (item.question.answer == item.choice_id) {
                    correct_answer = true;
                    total_points++;
                } else {
                    correct_answer = false;
                }
                results[index] = {
                    'question_title': item.question.title,
                    'answer_title': item.question.choices[item.question.answer].choice_text,
                    'correct_answer': correct_answer,
                    'answer': item.question.answer,
                    'answer_chosen': item.choice_id,
                    'response_time': item.response_time
                };
                total_response_time += item.response_time;
            });
        } else {
            return fn(null, null);
        }
        results['total_points'] = total_points;
        results['total_questions'] = total_questions;
        results['avg_response_time'] = (total_response_time / total_questions).toFixed(3); //Round off to 3 decimals.
        return fn(null, results);
    });
}
module.exports = router;
