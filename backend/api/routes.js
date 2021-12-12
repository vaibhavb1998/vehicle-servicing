// packages
const express = require("express");

// express router
const routes = express.Router();

const validate = require("./validator.js");
const auth = require("../utils/auth.js");

// express validation
const validation = require("./validation");

// controller
const controller = require("./controller");

// @route api/register
// @desc User registration
routes
  .route("/register")
  .post(validation.register, validate, controller.register);

// @route api/login
// @desc User login
routes.route("/login").post(validation.login, validate, controller.login);

// @route api/logout
// @desc User logout
routes.route("/logout").put(auth, controller.logout);

// @route api/validate-user
// @desc Validate user data
routes.route("/validate-user").get(auth, controller.validateUser);

// @route api/request-service
// @desc User service request
routes
  .route("/request-service")
  .post(auth, validation.requestService, validate, controller.requestService);

// @route api/my-requests
// @desc User service requests list
routes.route("/my-requests").get(auth, controller.myRequests);

// @route api/all-service-requests
// @desc List all service requests from users
routes
  .route("/all-service-requests")
  .get(auth, controller.getAllServiceRequests);

// @route api/get-bill
// @desc Get bill by Id
routes
  .route("/get-bill")
  .get(auth, validation.getBillById, validate, controller.getBillById);

// @route api/assign-task
// @desc Assign a task to worker
routes
  .route("/assign-task")
  .put(auth, validation.assignTask, validate, controller.assignTask);

// @route api/assigned-tasks
// @desc Assign a task to worker
routes.route("/assigned-tasks").get(auth, controller.getAssignedTasks);

// @route api/task-status
// @desc Update a task status
routes
  .route("/task-status")
  .put(
    auth,
    validation.updateTaskStatus,
    validate,
    controller.updateTaskStatus
  );

// @route api/users-type
// @desc Get users by type
routes
  .route("/users-type")
  .get(auth, validation.getUsersByType, validate, controller.getUsersByType);

module.exports = routes;
