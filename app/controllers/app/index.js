const express = require('express');
const companyRoutes = require('./company');
const commonRoutes = require('./common');
//const adminRoutes = require('./admin');
const intervieweeRoutes = require('./interviewee');

const router = express.Router();

router.use('/', commonRoutes);
router.use('/company', companyRoutes);
//router.use('/admin', adminRoutes);
router.use('/interviewee', intervieweeRoutes);
module.exports = router;
