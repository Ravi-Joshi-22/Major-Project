const express = require('express');

const router = express.Router();

function testAPI(req, res, next) {
  res.send({ user: 'Interviewee' });
}

router.get('/', testAPI);
module.exports = router;
