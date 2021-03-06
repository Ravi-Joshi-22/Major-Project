const express = require('express');
const dashboardProfileRoutes = require('./dashboardProfile');
const secondaryRoutes = require('./secondary');
const seniorSecondaryRoutes = require('./seniorSecondary');
const degreeRoutes = require('./degree');
const professionRoutes = require('./profession');
const testRoutes = require('./test');
const certificationRoutes = require('./certification');
const courseRoutes = require('./course');
const additionalRoutes = require('./additional');
const skillRoutes = require('./skill');
const projectRoutes = require('./project');

const router = express.Router();

router.use('/', dashboardProfileRoutes);
router.use('/secondary', secondaryRoutes);
router.use('/seniorSecondary', seniorSecondaryRoutes);
router.use('/degree', degreeRoutes);
router.use('/profession', professionRoutes);
router.use('/test', testRoutes);
router.use('/certification', certificationRoutes);
router.use('/course', courseRoutes);
router.use('/additional', additionalRoutes);
router.use('/skill', skillRoutes);
router.use('/project', projectRoutes);

module.exports = router;
