const httpStatus = require("http-status");
const jwt = require("jwt-simple");
const { DateTime } = require("luxon");
const User = require("../models/users");

// JWT Authenticate
const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    var strBuilder = [];
    for (key in authorization) {
      if (authorization.hasOwnProperty(key)) {
        strBuilder.push(
          "Key is " + key + ", value is " + authorization[key] + "\n"
        );
      }
    }

    const apiError = new Error({
      message: "Unauthorized",
      status: httpStatus.UNAUTHORIZED,
    });

    if (!authorization) {
      return next(apiError);
    }

    const token = authorization.split(" ")[1];

    try {
      const tokenResult = jwt.decode(token, process.env.JWT_SECRET);

      if (!tokenResult || !tokenResult.exp || !tokenResult._id) {
        apiError.message = "Malformed Token";

        return next(apiError);
      }

      if (tokenResult.exp - DateTime.local().toSeconds() < 0) {
        apiError.message = "Access token expired";

        return next(apiError);
      }

      const user = await User.findOne({ _id: tokenResult._id });

      if (!user) {
        return next(apiError);
      }

      req.user = user;

      return next();
    } catch (e) {
      apiError.message = e.message || "Token Expired";
      apiError.status = e.status || httpStatus.UNAUTHORIZED;

      return next(apiError);
    }
  } catch (e) {
    return next(
      new Error({
        message: httpStatus[500],
        status: httpStatus.INTERNAL_SERVER_ERROR,
      })
    );
  }
};

module.exports = (req, res, next) => auth(req, res, next);
