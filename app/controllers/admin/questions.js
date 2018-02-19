const express = require('express');
const questionLib = require('../../../lib/admin/questions');

const router = express.Router();
/**
 * add questions
 * @param  {Object}   req  Request Object
 * @param  {Object}   res  Response Object
 * @param  {Function} next Function to pass control to the next middleware
 */

function addQuestion(req, res, next) {
  questionLib.addNewQuestion(req.body, function(err, fetchedInstance) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedInstance);
  });
}

router.post('/add', addQuestion);
module.exports = router;
