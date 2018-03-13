const Models = require('../models');
const CONSTANTS = require('../../config/constants');
const ERROR_TYPES = CONSTANTS.ERROR_TYPES;

/**
 * Function to populate openings with company  Info
 * @param  {Array}    openings   Array of openings
 * @param  {Function} callback  Callback Function
 */
function _populateWithCompanyInfo(openings, callback) {
  Models.JobOpening.populate(
    openings,
    {
      path: 'company_id',
      select: { users: 0, credits: 0, createdAt: 0, updatedAt: 0 },
    },
    function(companyPopulationError, populatedResult) {
      if (companyPopulationError) {
        callback({
          type: ERROR_TYPES.DB_ERROR,
          msg:
            'Failed to provide company details , database error encountered ',
          errorDetail: JSON.stringify(companyPopulationError),
        });
      } else {
        callback(null, populatedResult);
      }
    }
  );
}

/**
 * Function to populate users array in company collection
 * @param {objectId} userId Company objectId
 * @param {Function} callback function two param err and fetched user
 */
function _populateCompanyUsers(companyId, callback) {
  Models.Company.find({
    _id: mongoose.Types.ObjectId(companyId),
  })
    .populate({
      path: 'users',
      select: { password: 0 },
    })
    .exec(function(err, fetchedData) {
      if (err) {
        callback({
          type: CONSTANTS.ERROR_TYPES.DB_ERROR,
          msg: 'Failed to check record, database error encountered !',
          errorDetail: JSON.stringify(err),
        });
      } else {
        callback(null, fetchedData);
      }
    });
}

function _populateTrackWithQuestion(trackDetail, callback) {
  Models.Question.populate(
    trackDetail,
    {
      path: 'questions.question_id',
      select: { tags: 0, answer: 0, createdAt: 0, updatedAt: 0 },
    },
    function(questionPopulationError, populatedResult) {
      if (questionPopulationError) {
        callback({
          type: ERROR_TYPES.DB_ERROR,
          msg:
            'Failed to provide question details , database error encountered ',
          errorDetail: JSON.stringify(questionPopulationError),
        });
      } else {
        callback(null, populatedResult);
      }
    }
  );
}

module.exports = {
  _populateWithCompanyInfo: _populateWithCompanyInfo,
  _populateTrackWithQuestion: _populateTrackWithQuestion,
  _populateCompanyUsers: _populateCompanyUsers
};
