const express = require('express');
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
