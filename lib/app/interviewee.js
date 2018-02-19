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
 * 
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
 * @param {Object} totalExperience User's Total experience
 * @param {Object} callback having two parameters first error and second saved Interviewee  
 */
function saveIntervieweeDetails(userId, beforeSeniorSecData, afterSeniorSecData, jobData, internshipData, skillData, courseData, certificationData, testData, projectData, additionalData, totalExperience, callback) {
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
        total_experience: totalExperience,
    });

    newInterviewee.save(function (intervieweeSaveError, savedInterviewee) {
        if (intervieweeSaveError) {
            callback({
                type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                msg: 'Unable to create Interviewee account',
                errorDetail: JSON.stringify(intervieweeSaveError),
            });
        } else {
            callback(null, savedInterviewee);
        }
    });
}

/**
 * 
 * @param {ObjectId} userId user Id
 * @param {Object} beforeSeniorSecData having before Senior Secondary Education Data 
 * @param {Object} callback has two parameters first errorInSave and second Saved Interviewee Details 
 */
function updateBeforeSeniorSecOfInterviewee(userId, beforeSeniorSecData, callback) {
    Interviewee.findById(userId, function (errInFetch, fetchedInterviewee) {
        if (errInFetch) {
            callback({
                type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                msg: "Unable to find Interviewee Data",
                errorDetail: JSON.stringify(errInFetch),
            });
        }
    });

    fetchedInterviewee.before_senior_sec = beforeSeniorSecData;
    fetchedInterviewee.save(function (errInSave, savedInterviewee) {
        if (errInSave) {
            callback({
                type: CONSTANTS.ERROR_TYPES.DB_ERROR,
                msg: 'Unable to save user Details',
                errorDetail: JSON.stringify(errInSave),
            });
        } else {
            callback(null, savedUser);
        }
    });
}

/**
function updateDegreeOfInterviewee(userId, afterSeniorSecData, callback) {
    
}

function updateJobOfInterviewee(userId, jobData, callback) {
    
}

function updateInternshipOfInterviewee(userId, internshipData, callback) {
    
}

function updateSkillOfInterviewee(userId, skillData, callback) {
    
}

function updateCourseOfInterviewee(userId, courseData, callback) {
    
}

function updateCertificationOfInterviewee(userId, certificationData, callback) {
    
}

function updateTestOfInterviewee(userId, testData, callback) {
    
}

function updateProjectOfInterviewee(userId, projectData, callback) {
    
}

function updateAdditionalOfInterviewee(userId, additionalData, callback) {
    
}
 */

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
 * @param {Object} totalExperience User's Total experience
 * @param {Object} callback having two parameters first err and second new Interviewee   
 */
function newInterviewee(userData, beforeSeniorSecData, afterSeniorSecData, jobData, internshipData, skillData, courseData, certificationData, testData, projectData, additionalData, totalExperience, callback) {
    async.waterfall(
        [
            function (waterfallCallback) {
                userHelper.registerUser(userData, function (err, savedUser) {
                    waterfallCallback(err, savedUser);
                });
            },

            function (savedUser, waterfallCallback) {
                saveIntervieweeDetails(savedUser._id, beforeSeniorSecData, afterSeniorSecData, jobData, internshipData, skillData, courseData, certificationData, testData, projectData, additionalData, totalExperience, function (err, savedInterviewee) {
                    waterfallCallback(err, savedInterviewee, savedUser);
                });
            },

            function (savedInterviewee, savedUser, waterfallCallback) {
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
                mailHelper.sendVerificationMail(sendmailObj, function (errInSent, sentMail) {
                    waterfallCallback(errInSent, savedInterviewee);
                });
            },
        ],
        function (err, newInterviewee) {
            callback(err, newInterviewee);
        }
    );
}

module.exports = {
    newInterviewee: newInterviewee,
};