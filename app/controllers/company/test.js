const express = require('express');

const router = express.Router();

function testAPI(req, res, next) {
  res.send({ user: 'COMPANY' });
}

router.get('/', testAPI);
module.exports = router;
