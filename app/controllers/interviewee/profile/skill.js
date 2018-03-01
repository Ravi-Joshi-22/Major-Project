const express = require('express');
const skillLib = require('../../../../lib/interviewee/profile/skill');

const router = express.Router();

/**
 * Function to add new Skill Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addSkillDetails(req, res, next) {
  skillLib.addSkillOfInterviewee(req.user._id, req.body.skill, function(
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
 * Function to update Skill Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateSkillDetails(req, res, next) {
  skillLib.updateSkillOfInterviewee(req.user._id, req.body.skill, function(
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
 * Function to delete existing Skill Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteSkillDetails(req, res, next) {
  skillLib.deleteSkillOfInterviewee(req.user._id, req.body.skill._id, function(
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

router.post('/add', addSkillDetails);
router.post('/update', updateSkillDetails);
router.delete('/delete', deleteSkillDetails);

module.exports = router;
