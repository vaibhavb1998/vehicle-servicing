const { body, query } = require("express-validator");

module.exports = {
  login: [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isString()
      .withMessage("Email is invalid")
      .bail()
      .isEmail()
      .withMessage("Email is invalid")
      .bail(),
  ],
  register: [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isString()
      .withMessage("Name is invalid")
      .bail(),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isString()
      .withMessage("Email is invalid")
      .bail()
      .isEmail()
      .withMessage("Email is invalid")
      .bail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isString()
      .withMessage("Password is invalid")
      .bail(),
    body("address")
      .notEmpty()
      .withMessage("Address is required")
      .bail()
      .isString()
      .withMessage("Address is invalid")
      .bail(),
    body("city")
      .notEmpty()
      .withMessage("City is required")
      .bail()
      .isString()
      .withMessage("City is invalid")
      .bail(),
    body("state")
      .notEmpty()
      .withMessage("State is required")
      .bail()
      .isString()
      .withMessage("State is invalid")
      .bail(),
    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone number is required")
      .bail()
      .isString()
      .withMessage("Phone number is invalid")
      .bail(),
    body("landline")
      .notEmpty()
      .withMessage("Landline number is required")
      .bail()
      .isString()
      .withMessage("Landline number is invalid")
      .bail(),
  ],
  requestService: [
    body("vehicleType")
      .notEmpty()
      .withMessage("Vehicle type is required")
      .bail()
      .isString()
      .withMessage("Vehicle type is invalid")
      .bail()
      .isIn(["truck", "bus", "four-wheeler", "three-wheeler", "two-wheeler"])
      .withMessage("Vehicle type is invalid")
      .bail(),
    body("serviceType")
      .notEmpty()
      .withMessage("Service type is required")
      .bail()
      .isString()
      .withMessage("Service type is invalid")
      .bail()
      .isIn([
        "washing",
        "cleaning",
        "servicing",
        "part-replacement",
        "oil-change",
      ])
      .withMessage("Vehicle type is invalid")
      .bail(),
    body("vehicleNumber")
      .notEmpty()
      .withMessage("Vehicle number is required")
      .bail()
      .isString()
      .withMessage("Vehicle number is invalid")
      .bail(),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .bail()
      .isNumeric()
      .withMessage("Price is invalid")
      .bail(),
  ],
  getBillById: [
    query("requestId")
      .notEmpty()
      .withMessage("Request Id is required")
      .bail()
      .isString()
      .withMessage("Request Id is invalid")
      .bail()
      .isMongoId()
      .withMessage("Request Id is invalid")
      .bail(),
  ],
  assignTask: [
    query("requestId")
      .notEmpty()
      .withMessage("Request Id is required")
      .isString()
      .withMessage("Request Id is invalid"),
    query("workerId")
      .notEmpty()
      .withMessage("Worker Id is required")
      .isString()
      .withMessage("Worker Id is invalid"),
  ],
  getUsersByType: [
    query("userType")
      .notEmpty()
      .withMessage("User type is required")
      .bail()
      .isIn(["user", "worker", "admin"])
      .withMessage("User type is invalid")
      .bail(),
  ],
  updateTaskStatus: [
    query("requestId")
      .notEmpty()
      .withMessage("Request Id is required")
      .isString()
      .withMessage("Request Id is invalid"),
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .bail()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Status is invalid")
      .bail(),
  ],
};
