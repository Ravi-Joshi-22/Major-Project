/**
 *
 * This file should contain the base path for each of the different
 * kinds of users that we have in our system and import the corresponding
 * routes for that particular user.
 *
 * For examples: /smarthyre/api/v1/<ENTITY>
 *
 * We define the ENTITY base route here and import all it's subroute and attach
 * to it.
 *
 */
const express = require('express');
const adminRoutes = require('./admin');
const appRoutes = require('./app');
const companyRoutes = require('./company');
const intervieweeRoutes = require('./interviewee');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/app', appRoutes);
router.use('/company', companyRoutes);
router.use('/interviewee', intervieweeRoutes);
module.exports = router;
