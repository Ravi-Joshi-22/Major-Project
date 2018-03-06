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

module.exports = {
  _populateWithCompanyInfo: _populateWithCompanyInfo,
};
