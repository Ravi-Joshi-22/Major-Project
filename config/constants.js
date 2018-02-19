/**
 * This file consist of ENUM values and various constants
 * used across the project.
 */

module.exports = {
  ERROR_TYPES: {
    DB_ERROR: 'db_error',
    INVALID_RECORD: 'invalid_record',
    INCORRECT_PAYLOAD: 'incorrect_payload',
    TYPE_ERROR: 'type_error',
    ITERATION_ERROR: 'iteration_error',
    VALIDATION_ERROR: 'validation_error',
    AUTHENTICATION_ERROR: 'authentication_error',
    AUTH0_ERROR: 'auth0_error',
    SEND_MAIL_ERROR: 'send_mail_error',
    SEND_OTP_ERROR: 'send_otp_error',
    FILE_STREAM_ERROR: 'file_stream_error',
  },
  USER_ROLES: {
    ADMIN: 'admin',
    INTERVIEWEE: 'interviewee',
    COMPANY_HEAD: 'company_head',
    COMPANY_USER: 'company_user',
  },
  ENUMS: {
    USER: {
      VERIFICATION_STATUS: {
        IN_PROCESS: 'in_process',
        EMAIL_VERIFIED: 'email_verified',
        OTP_VERIFIED: 'otp_verified',
      },
      INTERVIEW_STATUS: {
        APPLIED: 'applied',
        GIVEN: 'given',
        SELECTED: 'selected',
        REJECTED: 'rejected',
      },
      PERFORMANCE_SCALE: {
        CGPA: 'CGPA(Scale of 10)',
        PERCENTAGE: 'Percentage',
      },
      STREAM_VALUE: {
        SCIENCE: 'Science',
        COMMERCE: 'Commerce',
        ARTS: 'Arts',
      },
      SKILLS_RATE: {
        BEGINNER: 'Beginner',
        INTERMEDIATE: 'Intermediate',
        ADVANCED: 'Advanced',
      },
    },
    COMPANY: {
      VERIFICATION_STATUS: {
        IN_PROCESS: 'in_process',
        CERTIFICATE_UPLOADED: 'certificate_uploaded',
        ADMIN_APPROVED: 'admin_approved',
        ADMIN_DECLINED: 'admin_declined',
      },
    },
    TOPIC: {
      JAVA: 'java',
      CPP: 'c++',
      C: 'c',
      JAVASCIRPT: 'javascript',
    },
    OTP_RESPONSE_TYPE: {
      SUCCESS: 'success',
      ERROR: 'error',
    },
  },
  CURRENT_DAY: 'Current Day',
  SENDER_ID: 'SMARTHYRE',
  OTP_EXPIRY: 20,
};
