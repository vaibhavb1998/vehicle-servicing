// packages
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");

// model
const User = require("../models/users");
const Service = require("../models/services");

const { isEmpty } = require("lodash");

exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await User.findOne({ email });

    const passwordMatches = await user.passwordMatches(password);

    if (!passwordMatches) {
      return res.status(httpStatus.CONFLICT).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const jwtToken = await user.token();
    res.cookie("auth_cookie", jwtToken);

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.log("err", err);
    return next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      body: {
        name,
        email,
        password,
        address,
        city,
        state,
        phoneNumber,
        landline,
      },
    } = req;

    if (!isEmpty(await User.findOne({ email }))) {
      return res.status(httpStatus.CONFLICT).json({
        success: false,
        message: "Email is already in use",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hash,
      address,
      city,
      state,
      phoneNumber,
      landline,
    });

    await newUser.save();

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Registration successful",
    });
  } catch (err) {
    console.log("err", err);
    return next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("auth_cookie");

    return res.status(httpStatus.OK).json({ message: "Logout successful" });
  } catch (err) {
    return next(err);
  }
};

exports.validateUser = async (req, res, next) => {
  try {
    const { user } = req;

    return res.status(httpStatus.OK).json({
      message: "Fetched user details",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.requestService = async (req, res, next) => {
  try {
    const {
      body: { vehicleType, serviceType, vehicleNumber, price },
      user,
    } = req;

    const newService = new Service({
      userId: user._id,
      vehicleType,
      serviceType,
      vehicleNumber,
      price,
    });

    await newService.save();

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Service request submitted successfully",
    });
  } catch (err) {
    return next(err);
  }
};

exports.myRequests = async (req, res, next) => {
  try {
    const { user } = req;

    const list = await Service.find({ userId: user._id });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "List fetched successfully",
      list,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllServiceRequests = async (req, res, next) => {
  try {
    const list = await Service.find()
      .populate({
        path: "userId",
        model: User,
      })
      .populate({
        path: "workerId",
        model: User,
      });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "List fetched successfully",
      list,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getBillById = async (req, res, next) => {
  try {
    const {
      query: { requestId },
    } = req;

    const bill = await Service.findOne({ _id: requestId })
      .populate({
        path: "userId",
        model: User,
      })
      .populate({
        path: "workerId",
        model: User,
      });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Bill fetched successfully",
      bill,
    });
  } catch (err) {
    return next(err);
  }
};

exports.assignTask = async (req, res, next) => {
  try {
    const {
      query: { requestId, workerId },
    } = req;

    await Service.updateOne({ _id: requestId }, { workerId });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Task assigned successfully",
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAssignedTasks = async (req, res, next) => {
  try {
    const { user } = req;

    const list = await Service.find();
    // const list = await Service.find({ workerId: user._id });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "List fetched successfully",
      list,
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateTaskStatus = async (req, res, next) => {
  try {
    const {
      query: { requestId },
      body: { status },
      user,
    } = req;

    await Service.updateOne({ _id: requestId }, { status });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (err) {
    return next(err);
  }
};

exports.getUsersByType = async (req, res, next) => {
  try {
    const {
      query: { userType },
    } = req;

    const list = await User.find({ userType });

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Users list fetched successfully",
      list,
    });
  } catch (err) {
    return next(err);
  }
};
