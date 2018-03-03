const express = require('express');
const secondaryRoutes = require('./secondary');
const seniorSecondaryRoutes = require('./seniorSecondary');
const degreeRoutes = require('./degree');
const professionRoutes = require('./profession');

const router = express.Router();

router.use('/profession', professionRoutes);
// router.use('/test', testRoutes);
// router.use('/certification', certificationRoutes);
// router.use('/course', courseRoutes);
// router.use('/additional', additionalRoutes);
// router.use('/skill', skillRoutes);
// router.use('/project', projectRoutes);
module.exports = router;
