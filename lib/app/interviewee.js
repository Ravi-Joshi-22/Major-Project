const async = require('async');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Models = require('../../app/models');
const Interviewee = Models.Interviewee;
const userHelper = require('../../app/helpers/user');
const mailHelper = require('../../app/helpers/mail_helper');
const CONSTANTS = require('../../config/constants');
const KEYS = require('../../config/keys');

/**
 * Function to store Interviewee Details at the time of registration
 * @param {ObjectId} userId user Id
 * @param {Object} beforeSeniorSecData having before Senior Secondary Education Data
 * @param {Object} afterSeniorSecData having array of after Senior Secondary Educations Data
 * @param {Object} jobData having array of Jobs Data
 * @param {Object} internshipData having array of Internships Data
 * @param {Object} skillData having array of Skills Data
 * @param {Object} courseData having array of Courses Data
 * @param {Object} certificationData having array of Certifications Data
 * @param {Object} testData having array of Tests Data
 * @param {Object} projectData having array of Projects Data
 * @param {Object} additionalData having array of Additional information about Interviewee
 * @param {Object} callback having two parameters first error and second saved Interviewee
 */
function saveIntervieweeDetails(
  userId,
  beforeSeniorSecData,
  afterSeniorSecData,
  jobData,
  internshipData,
  skillData,
  courseData,
  certificationData,
  testData,
  projectData,
  additionalData,
  callback
) {
  const newInterviewee = new Interviewee({
    userId: userId,
    before_senior_sec: beforeSeniorSecData,
    after_senior_sec: afterSeniorSecData,
    jobs: jobData,
    internships: internshipData,
    skills: skillData,
    courses: courseData,
    certifications: certificationData,
    tests: testData,
    projects: projectData,
    additionals: additionalData,
  });

  newInterviewee.save(function(intervieweeSaveError, savedInterviewee) {
    if (intervieweeSaveError) {
      callback({
        type: CONSTANTS.ERROR_TYPES.DB_ERROR,
        msg: 'Unable to create Interviewee account, please try again !',
        errorDetail: JSON.stringify(intervieweeSaveError),
      });
    } else {
      callback(null, savedInterviewee);
    }
  });
}

/**
 * @param {Object} userData having user basic profile data
 * @param {Object} beforeSeniorSecData having before Senior Secondary Education Data
 * @param {Object} afterSeniorSecData having array of after Senior Secondary Educations Data
 * @param {Object} jobData having array of Jobs Data
 * @param {Object} internshipData having array of Internships Data
 * @param {Object} skillData having array of Skills Data
 * @param {Object} courseData having array of Courses Data
 * @param {Object} certificationData having array of Certifications Data
 * @param {Object} testData having array of Tests Data
 * @param {Object} projectData having array of Projects Data
 * @param {Object} additionalData having array of Additional information about Interviewee
 * @param {Object} callback having two parameters first err and second new Interviewee
 */
function newInterviewee(
  userData,
  beforeSeniorSecData,
  afterSeniorSecData,
  jobData,
  internshipData,
  skillData,
  courseData,
  certificationData,
  testData,
  projectData,
  additionalData,
  callback
) {
  async.waterfall(
    [
      function(waterfallCallback) {
        userHelper.registerUser(userData, function(err, savedUser) {
          waterfallCallback(err, savedUser);
        });
      },

      function(savedUser, waterfallCallback) {
        saveIntervieweeDetails(
          savedUser._id,
          beforeSeniorSecData,
          afterSeniorSecData,
          jobData,
          internshipData,
          skillData,
          courseData,
          certificationData,
          testData,
          projectData,
          additionalData,
          function(err, savedInterviewee) {
            waterfallCallback(err, savedInterviewee, savedUser);
          }
        );
      },

      function(savedInterviewee, savedUser, waterfallCallback) {
        const JWToken = jwt.sign(
          {
            userId: savedInterviewee.userId,
          },
          KEYS.SECRET.JWT_SECRET,
          {
            expiresIn: KEYS.SECRET.EXPIRE,
          }
        );

        const sendmailObj = {
          url: `${
            KEYS.HOSTNAME.URI
          }/smarthyre/api/v1/app/verifyEmail?token=${JWToken}`,
          email: savedUser.email,
          firstName: savedUser.first_name,
        };
        mailHelper.sendVerificationMail(sendmailObj, function(
          errInSent,
          sentMail
        ) {
          waterfallCallback(errInSent, savedInterviewee);
        });
      },
    ],
    function(err, newInterviewee) {
      callback(err, newInterviewee);
    }
  );
}

module.exports = {
  newInterviewee: newInterviewee,
};
