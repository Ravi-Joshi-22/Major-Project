const express = require('express');
const projectLib = require('../../../../lib/interviewee/profile/project');

const router = express.Router();

/**
 * Function to add new Project Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function addProjectDetails(req, res, next) {
  projectLib.addProjectOfInterviewee(req.user._id, req.body.project, function(
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
 * Function to update Project Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function updateProjectDetails(req, res, next) {
  projectLib.updateProjectOfInterviewee(
    req.user._id,
    req.body.project,
    function(errInUpdation, updatedInstance) {
      if (errInUpdation) {
        res.status(500).json(errInUpdation);
      } else {
        res.status(200).json(updatedInstance);
      }
    }
  );
}

/**
 * Function to delete existing Project Details
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Function} next Function to pass control to the next middleware
 */
function deleteProjectDetails(req, res, next) {
  projectLib.deleteProjectOfInterviewee(
    req.user._id,
    req.body.project._id,
    function(errInUpdation, updatedInstance) {
      if (errInUpdation) {
        res.status(500).json(errInUpdation);
      } else {
        res.status(200).json(updatedInstance);
      }
    }
  );
}

router.post('/', addProjectDetails);
router.put('/', updateProjectDetails);
router.delete('/', deleteProjectDetails);

module.exports = router;
