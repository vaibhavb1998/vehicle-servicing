const { validationResult } = require("express-validator");
const isEmpty = require("lodash/isEmpty");
const httpStatus = require("http-status");

const validate = (req, res, next) => {
  const formatErrorMessage = ({ msg }) => msg;

  const errors = validationResult(req).formatWith(formatErrorMessage);
  console.log('errors', errors)
  if (!errors.isEmpty()) {
    return res
      .status(httpStatus.EXPECTATION_FAILED)
      .json({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = validate;
