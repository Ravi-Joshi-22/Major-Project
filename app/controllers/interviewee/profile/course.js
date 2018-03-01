const express = require('express');
const courseLib = require('../../../../lib/interviewee/profile/course');

const router = express.Router();

/**
 * Function to add new Course Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addCourseDetails(req, res, next) {
  courseLib.addCourseOfInterviewee(req.user._id, req.body.course, function(
    errInUpdation,
    updatedInstance
  ) {
    if (errInUpdation) {
      res.status(500).json(errInUpdation);
    } else {
      res.status(200).json(updatedInstance);
    }
  });
}

/**
 * Function to update Course Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateCourseDetails(req, res, next) {
  courseLib.updateCourseOfInterviewee(req.user._id, req.body.course, function(
    errInUpdation,
    updatedInstance
  ) {
    if (errInUpdation) {
      res.status(500).json(errInUpdation);
    } else {
      res.status(200).json(updatedInstance);
    }
  });
}

/**
 * Function to delete existing Course Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteCourseDetails(req, res, next) {
  courseLib.deleteCourseOfInterviewee(
    req.user._id,
    req.body.course._id,
    function(errInUpdation, updatedInstance) {
      if (errInUpdation) {
        res.status(500).json(errInUpdation);
      } else {
        res.status(200).json(updatedInstance);
      }
    }
  );
}

router.post('/add', addCourseDetails);
router.post('/update', updateCourseDetails);
router.delete('/delete', deleteCourseDetails);

module.exports = router;
