const async = require('async');
const mongoose = require('mongoose');
const Models = require('../../app/models');
const InterviewAns = require('../../app/models/intervieweeAns');
const JobOpening = Models.JobOpening;
const Interviewee = Models.Interviewee;
const InterviewTrack = Models.InterviewTrack;
const userHelper = require('../../app/helpers/user');
const populateHelper = require('../../app/helpers/populate');
const openingHelper = require('../../app/helpers/opening_helper');
const questionHelper = require('../../app/helpers/question_helper');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

/**
 * Function to extract all Object Id of logged user
 * @param {ObjectId} userId user Id
 * @param {Function} callback having error and Fetched data
 */
function getAllIntervieweeTracks(userId, callback) {
  InterviewTrack.find({ user_id: userId }, { _id: 1 }).exec(function(
    err,
    fetchedData
  ) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Failed to check record',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, fetchedData);
    }
  });
}

/**
 * Function to search all the eligible openings list
 * @param {Object} intervieweeData Interviewee Details
 * @param {Object} quaskills Object holding array of qualifications and skills
 * @param {Object} tracks array of all openings in which logged user has applied
 * @param {Function} callback having error and Fetched data
 */
function extractOpenings(intervieweeData, exp, quaskills, tracks, callback) {
  const ed = new Date();
  JobOpening.find({
    end_date: {
      $gte: ed,
    },
    interviewees: {
      $nin: tracks,
    },
    experience_min: {
      $lte: exp,
    },
    experience_max: {
      $gte: exp,
    },
    skills: {
      $in: quaskills.skills,
    },
  })
    .sort({ end_date: 1 })
    .exec(function(err, fetchedData) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to get eligible openings records, please try again',
          errorDetail: JSON.stringify(err),
        });
      } else {
        callback(null, fetchedData);
      }
    });
}

/**
 * Function to get all the eligible openings list
 * @param {ObjectId} userId user Id
 * @param {Function} callback having error and Data
 */
function eligibleOpenings(userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.getIntervieweeDetails(userId, function(
          err,
          fetchedInterviewee
        ) {
          waterfallCallback(err, fetchedInterviewee);
        });
      },

      function(fetchedInterviewee, waterfallCallback) {
        getAllIntervieweeTracks(userId, function(err, tracks) {
          waterfallCallback(err, fetchedInterviewee, tracks);
        });
      },

      function(fetchedInterviewee, tracks, waterfallCallback) {
        const skills = fetchedInterviewee.skills.map(
          eachskills => eachskills.name
        );
        const qualifications = fetchedInterviewee.after_senior_sec.map(
          eachafter_senior_sec => eachafter_senior_sec.degree
        );
        const quaskills = {
          skills,
          qualifications,
        };
        waterfallCallback(null, fetchedInterviewee, quaskills, tracks);
      },

      function(fetchedInterviewee, quaskills, tracks, waterfallCallback) {
        userHelper.getTotalExperience(userId, function(err, experience) {
          const exp = experience.total_experience;
          waterfallCallback(err, fetchedInterviewee, exp, quaskills, tracks);
        });
      },

      function(fetchedInterviewee, exp, quaskills, tracks, waterfallCallback) {
        extractOpenings(fetchedInterviewee, exp, quaskills, tracks, function(
          err,
          Opening
        ) {
          waterfallCallback(err, Opening);
        });
      },

      function(openings, waterfallCallback) {
        populateHelper._populateWithCompanyInfo(openings, function(
          err,
          populatedOpenings
        ) {
          waterfallCallback(err, populatedOpenings);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

/**
 * Function to fetch all upcoming applied openings
 * @param {Object} tracks
 * @param {Function} callback having error and fetched data
 */
function extractUpcomingApplied(userId, tracks, callback) {
  const ed = new Date();
  JobOpening.find({
    end_date: {
      $gt: ed,
    },
    start_date: {
      $gt: ed,
    },
    interviewees: {
      $in: tracks,
    },
  })
    .populate('company_id')
    .populate({
      path: 'interviewees',
      match: { user_id: userId },
    })
    .sort({ end_date: 1 })
    .exec(function(err, fetchedData) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg:
            'Failed to get upcoming applied openings records, please try again',
          errorDetail: JSON.stringify(err),
        });
      } else {
        callback(null, fetchedData);
      }
    });
}

/**
 * Function to fetch applied interviews which are to be taken on current date
 * @param {Object} tracks
 * @param {Function} callback having error and fetched data
 */
function extractCurrentApplied(userId, tracks, callback) {
  const ed = new Date();
  JobOpening.find({
    end_date: {
      $gte: ed,
    },
    start_date: {
      $lte: ed,
    },
    interviewees: {
      $in: tracks,
    },
  })
    .populate('company_id')
    .populate({
      path: 'interviewees',
      match: { user_id: userId },
    })
    .sort({ end_date: 1 })
    .exec(function(err, fetchedData) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg:
            'Failed to get current date applied openings records, please try again',
          errorDetail: JSON.stringify(err),
        });
      } else {
        callback(null, fetchedData);
      }
    });
}

/**
 * Function for getting upcoming applied opening and today's applied opening
 * @param {ObjectId} userId
 * @param {Function} callback having error and data
 */
function appliedOpenings(userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        getAllIntervieweeTracks(userId, function(err, tracks) {
          waterfallCallback(err, tracks);
        });
      },

      function(tracks, waterfallCallback) {
        extractUpcomingApplied(userId, tracks, function(err, upcomingOpening) {
          waterfallCallback(err, tracks, upcomingOpening);
        });
      },

      function(tracks, upcomingOpening, waterfallCallback) {
        extractCurrentApplied(userId, tracks, function(err, currentOpening) {
          waterfallCallback(err, upcomingOpening, currentOpening);
        });
      },

      function(upcomingOpening, currentOpening, waterfallCallback) {
        const applied = {
          currentAppliedOpenings: currentOpening,
          upcomingAppliedOpenings: upcomingOpening,
        };
        waterfallCallback(null, applied);
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

/**
 * Function to check if user has already applied or not
 * @param {ObjectId} openingId opening table object Id
 * @param {ObjectId} userId user Id
 * @param {Function} callback  having error and data
 */
function checkIfApplied(openingId, userId, callback) {
  JobOpening.find({
    _id: mongoose.Types.ObjectId(openingId),
  })
    .populate({
      path: 'interviewees',
      match: { user_id: userId },
    })
    .exec(function(err, fetchedData) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to check record',
          errorDetail: JSON.stringify(err),
        });
      } else if (fetchedData[0].interviewees.length > 0) {
        callback({
          type: CONSTANTS.ERROR_TYPES.INVALID_RECORD,
          msg: 'You have already applied for the following opening.',
          errorDetail: 'You cannot apply for any opening more than once.',
        });
      } else {
        callback(null, fetchedData);
      }
    });
}

/**
 * Function to generate random question from each skill
 * @param {array} skillsArray skill array
 * @param {Function} callback error and question Index
 */

function getRandomQuestion(skillsArray, callback) {
  var questionsId = [];
  async.eachSeries(
    skillsArray,
    function(eachSkill, iterateNext) {
      questionHelper.getSetOfQuestion(eachSkill, function(err, questionSet) {
        if (err) {
          iterateNext(err);
        } else if (questionSet.length === 0) {
          iterateNext(null);
        } else {
          let randomIndexs = new Array(questionSet.length);
          randomIndexs.fill(0, 0, questionSet.length);
          let i = 0,
            random;
          while (i < 3) {
            random = Math.floor(Math.random() * questionSet.length);
            if (randomIndexs[random] === 0) {
              randomIndexs[random] = 1;
              questionsId.push(questionSet[random]._id);
              i++;
            }
          }
          iterateNext(null);
        }
      });
    },
    function(error) {
      callback(error, questionsId);
    }
  );
}

/**
 * Function to create array of interviewAns objects  from question IDs
 * @param {array} questionsIds array of question Id
 * @param {function} callback error and array of interviewAns objects
 */
function createInterviewAns(questionsIds, callback) {
  let interviewQuesAns = [];
  async.eachSeries(
    questionsIds,
    function(eachQuestionId, iterateNext) {
      const newInterviewQue = {
        question_id: eachQuestionId,
        answer: '',
        tags: [],
        score: 0,
      };
      interviewQuesAns.push(newInterviewQue);
      iterateNext(null);
    },
    function(err) {
      callback(err, interviewQuesAns);
    }
  );
}

/**
 * To create new Opening
 * @param {objectId} userId having user _id
 * @param {Function} callback having error and created Interview Track
 */
function createNewTrack(userId, interviewAnsArray, callback) {
  const newTrack = new InterviewTrack({
    user_id: userId,
    interview_status: CONSTANTS.ENUMS.USER.INTERVIEW_STATUS.APPLIED,
    questions: interviewAnsArray,
  });

  newTrack.save(function(err, createdTrack) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to create new Interview track.',
        errorDetail: JSON.stringify(err),
      });
    } else {
      callback(null, createdTrack);
    }
  });
}

/**
 * function to add track to opening
 * @param {objectId} openingId _id of the new opening
 * @param {objectId} trackId _id of the new track
 * @param {Function} callback having err and companies new track
 */
function addTrack(openingId, trackId, callback) {
  JobOpening.findById(openingId, function(err, doc) {
    if (err) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'No opening found with this Id , please enter valid Id',
        errorDetail: JSON.stringify(err),
      });
    }

    doc.interviewees.push(trackId);
    doc.save(function(errInSave, savedTrack) {
      if (errInSave) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to update a new track in opening',
          errorDetail: String(errInSave),
        });
        return;
      }
      callback(null, savedTrack);
    });
  });
}

/**
 * Function to apply for new opening
 * @param {objectId} openingId
 * @param {objectId} userId
 * @param {Function} callback
 */
function applyForOpening(openingId, userId, callback) {
  async.waterfall(
    [
      function(waterfallCallback) {
        checkIfApplied(openingId, userId, function(err, data) {
          waterfallCallback(err, data);
        });
      },

      function(data, waterfallCallback) {
        openingHelper.getSkillsFromOpening(openingId, function(err, skills) {
          waterfallCallback(err, skills);
        });
      },

      function(skills, waterfallCallback) {
        getRandomQuestion(skills, function(err, randomQuesId) {
          waterfallCallback(err, randomQuesId);
        });
      },

      function(randomQuesId, waterfallCallback) {
        createInterviewAns(randomQuesId, function(err, interviewAnsObjects) {
          waterfallCallback(err, interviewAnsObjects);
        });
      },

      function(interviewAnsObjects, waterfallCallback) {
        createNewTrack(userId, interviewAnsObjects, function(
          err,
          createdTrack
        ) {
          waterfallCallback(err, createdTrack);
        });
      },

      function(createdTrack, waterfallCallback) {
        addTrack(openingId, createdTrack._id, function(err, addedTrack) {
          waterfallCallback(err, addedTrack);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  applyForOpening: applyForOpening,
  eligibleOpenings: eligibleOpenings,
  appliedOpenings: appliedOpenings,
};
