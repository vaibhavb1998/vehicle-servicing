import { createSlice } from "@reduxjs/toolkit";
import get from "lodash/get";

// project imports
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "store",

  initialState: {
    register: {
      data: {},
      error: "",
      loading: false,
    },
    login: {
      data: {},
      error: "",
      loading: false,
    },
    logout: {
      error: "",
      loading: false,
    },
    validateUser: {
      user: {},
      error: "",
      loading: false,
      isTokenVerified: false,
    },
    requestService: {
      data: {},
      error: "",
      loading: false,
    },
    myRequests: {
      data: {},
      error: "",
      loading: false,
    },
    getAllServiceRequests: {
      data: {},
      error: "",
      loading: false,
    },
    getBillById: {
      data: {},
      error: "",
      loading: false,
    },
    assignTask: {
      data: {},
      error: "",
      loading: false,
    },
    getAssignedTasks: {
      data: {},
      error: "",
      loading: false,
    },
    updateTaskStatus: {
      data: {},
      error: "",
      loading: false,
    },
    getUsersByType: {
      data: {},
      error: "",
      loading: false,
    },
  },

  reducers: {
    setUserDataAction: (state, action) => {
      state.validateUser.user = action.payload;
    },

    // login
    loginRequestedAction: (state) => {
      state.login.loading = true;
    },

    loginSuccessAction: (state, action) => {
      state.login.loading = false;
      state.validateUser.user = action.payload.user;
    },

    loginFailedAction: (state, action) => {
      state.login.loading = false;
      state.login.error = action.payload;
    },

    clearLoginAction: (state) => {
      state.login.data = {};
      state.login.error = "";
      state.login.loading = false;
    },

    // logout
    logoutRequestedAction: (state) => {
      state.validateUser.user = {};
    },

    logoutSuccessAction: (state) => {
      state.logout.loading = false;
      state.validateUser.user = {};
    },

    logoutFailedAction: (state, action) => {
      state.logout.loading = false;
      state.logout.error = action.payload;
    },

    clearLogoutAction: (state) => {
      state.logout.data = {};
      state.logout.error = "";
      state.logout.loading = false;
    },

    // validate user
    validateUserRequestAction: (state) => {
      state.validateUser.loading = true;
    },

    validateUserSuccessAction: (state, action) => {
      state.validateUser.loading = false;
      state.validateUser.isTokenVerified = true;
      state.validateUser.user = action.payload.user;
    },

    validateUserFailedAction: (state, action) => {
      state.validateUser.loading = false;
      state.validateUser.isTokenVerified = true;
      state.validateUser.user = {};
      state.validateUser.error = action.payload || "something went wrong";
    },

    clearValidateUserAction: (state) => {
      state.validateUser.data = {};
      state.validateUser.error = "";
      state.validateUser.loading = false;
    },

    // user registration
    registerUserRequestAction: (state) => {
      state.register.loading = true;
    },

    registerUserRequestSuccessAction: (state, action) => {
      state.register.loading = false;
      state.register.data = action.payload;
    },

    registerUserRequestFailedAction: (state, action) => {
      state.register.loading = false;
      state.register.error = action.payload;
    },

    clearRegisterAction: (state) => {
      state.register.data = {};
      state.register.error = "";
      state.register.loading = false;
    },

    // request service
    requestServiceRequestAction: (state) => {
      state.requestService.loading = true;
    },

    requestServiceRequestSuccessAction: (state, action) => {
      state.requestService.loading = false;
      state.requestService.data = action.payload;
    },

    requestServiceRequestFailedAction: (state, action) => {
      state.requestService.loading = false;
      state.requestService.error = action.payload;
    },

    clearRequestServiceAction: (state) => {
      state.requestService.data = {};
      state.requestService.error = "";
      state.requestService.loading = false;
    },

    // my service requests
    myServiceRequestAction: (state) => {
      state.myRequests.loading = true;
    },

    myServiceRequestsSuccessAction: (state, action) => {
      state.myRequests.loading = false;
      state.myRequests.data = action.payload;
    },

    myServiceRequestsFailedAction: (state, action) => {
      state.myRequests.loading = false;
      state.myRequests.error = action.payload;
    },

    clearMyServiceRequestAction: (state) => {
      state.myRequests.data = {};
      state.myRequests.error = "";
      state.myRequests.loading = false;
    },

    // get all service requests
    getAllServiceRequestAction: (state) => {
      state.getAllServiceRequests.loading = true;
    },

    getAllServiceRequestSuccessAction: (state, action) => {
      state.getAllServiceRequests.loading = false;
      state.getAllServiceRequests.data = action.payload;
    },

    getAllServiceRequestFailedAction: (state, action) => {
      state.getAllServiceRequests.loading = false;
      state.getAllServiceRequests.error = action.payload;
    },

    clearGetAllServiceRequestAction: (state) => {
      state.getAllServiceRequests.data = {};
      state.getAllServiceRequests.error = "";
      state.getAllServiceRequests.loading = false;
    },

    // get bill by Id
    getBillByIdRequestAction: (state) => {
      state.getBillById.loading = true;
    },

    getBillByIdRequestSuccessAction: (state, action) => {
      state.getBillById.loading = false;
      state.getBillById.data = action.payload;
    },

    getBillByIdRequestFailedAction: (state, action) => {
      state.getBillById.loading = false;
      state.getBillById.error = action.payload;
    },

    clearGetBillByIdAction: (state) => {
      state.getBillById.data = {};
      state.getBillById.error = "";
      state.getBillById.loading = false;
    },

    // assign task
    assignTaskRequestAction: (state) => {
      state.assignTask.loading = true;
    },

    assignTaskRequestSuccessAction: (state, action) => {
      state.assignTask.loading = false;
      state.assignTask.data = action.payload;
    },

    assignTaskRequestFailedAction: (state, action) => {
      state.assignTask.loading = false;
      state.assignTask.error = action.payload;
    },

    clearAssignTaskAction: (state) => {
      state.assignTask.data = {};
      state.assignTask.error = "";
      state.assignTask.loading = false;
    },

    // get assigned tasks
    getAssignedTasksRequestAction: (state) => {
      state.getAssignedTasks.loading = true;
    },

    getAssignedTasksRequestSuccessAction: (state, action) => {
      state.getAssignedTasks.loading = false;
      state.getAssignedTasks.data = action.payload;
    },

    getAssignedTasksRequestFailedAction: (state, action) => {
      state.getAssignedTasks.loading = false;
      state.getAssignedTasks.error = action.payload;
    },

    clearGetAssingedTaskAction: (state) => {
      state.getAssignedTasks.data = {};
      state.getAssignedTasks.error = "";
      state.getAssignedTasks.loading = false;
    },

    // update task status
    updateTaskStatusRequestAction: (state) => {
      state.updateTaskStatus.loading = true;
    },

    updateTaskStatusRequestSuccessAction: (state, action) => {
      state.updateTaskStatus.loading = false;
      state.updateTaskStatus.data = action.payload;
    },

    updateTaskStatusRequestFailedAction: (state, action) => {
      state.updateTaskStatus.loading = false;
      state.updateTaskStatus.error = action.payload;
    },

    clearUpdateTaskStatusAction: (state) => {
      state.updateTaskStatus.data = {};
      state.updateTaskStatus.error = "";
      state.updateTaskStatus.loading = false;
    },

    // get users by type
    getUsersByTypeRequestAction: (state) => {
      state.getUsersByType.loading = true;
    },

    getUsersByTypeRequestSuccessAction: (state, action) => {
      state.getUsersByType.loading = false;
      state.getUsersByType.data = action.payload;
    },

    getUsersByTypeRequestFailedAction: (state, action) => {
      state.getUsersByType.loading = false;
      state.getUsersByType.error = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  setUserDataAction,

  // login
  loginRequestedAction,
  loginSuccessAction,
  loginFailedAction,
  clearLoginAction,

  // logout
  logoutRequestedAction,
  logoutSuccessAction,
  logoutFailedAction,
  clearLogoutAction,

  // vaildate user
  validateUserRequestAction,
  validateUserSuccessAction,
  validateUserFailedAction,
  clearValidateUserAction,

  // user registration
  registerUserRequestAction,
  registerUserRequestSuccessAction,
  registerUserRequestFailedAction,
  clearRegisterAction,

  // request service
  requestServiceRequestAction,
  requestServiceRequestSuccessAction,
  requestServiceRequestFailedAction,
  clearRequestServiceAction,

  // my service requests
  myServiceRequestAction,
  myServiceRequestsSuccessAction,
  myServiceRequestsFailedAction,
  clearMyServiceRequestAction,

  // get all service requests
  getAllServiceRequestAction,
  getAllServiceRequestSuccessAction,
  getAllServiceRequestFailedAction,
  clearGetAllServiceRequestAction,

  // get bill by Id
  getBillByIdRequestAction,
  getBillByIdRequestSuccessAction,
  getBillByIdRequestFailedAction,
  clearGetBillByIdAction,

  // assign task
  assignTaskRequestAction,
  assignTaskRequestSuccessAction,
  assignTaskRequestFailedAction,
  clearAssignTaskAction,

  // get assigned tasks
  getAssignedTasksRequestAction,
  getAssignedTasksRequestSuccessAction,
  getAssignedTasksRequestFailedAction,
  clearGetAssingedTaskAction,

  // update task status
  updateTaskStatusRequestAction,
  updateTaskStatusRequestSuccessAction,
  updateTaskStatusRequestFailedAction,
  clearUpdateTaskStatusAction,

  // get users by type
  getUsersByTypeRequestAction,
  getUsersByTypeRequestSuccessAction,
  getUsersByTypeRequestFailedAction,
} = slice.actions;

export const register = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/register`,
      method: "POST",
      data: payload,
      onStart: registerUserRequestAction.type,
      onSuccess: registerUserRequestSuccessAction.type,
      onError: registerUserRequestFailedAction.type,
    })
  );
};

export const login = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/login",
      method: "POST",
      data: payload,
      onStart: loginRequestedAction.type,
      onSuccess: loginSuccessAction.type,
      onError: loginFailedAction.type,
    })
  );
};

export const logout = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/logout",
      method: "PUT",
      onStart: logoutRequestedAction.type,
      onSuccess: logoutSuccessAction.type,
      onError: logoutFailedAction.type,
    })
  );
};

export const validateUser = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/validate-user",
      method: "GET",
      onStart: validateUserRequestAction.type,
      onSuccess: validateUserSuccessAction.type,
      onError: validateUserFailedAction.type,
    })
  );
};

export const requestService = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/request-service`,
      method: "POST",
      data: payload,
      onStart: requestServiceRequestAction.type,
      onSuccess: requestServiceRequestSuccessAction.type,
      onError: requestServiceRequestFailedAction.type,
    })
  );
};

export const myRequests = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/my-requests`,
      method: "GET",
      onStart: myServiceRequestAction.type,
      onSuccess: myServiceRequestsSuccessAction.type,
      onError: myServiceRequestsFailedAction.type,
    })
  );
};

export const getAllServiceRequests = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/all-service-requests`,
      method: "GET",
      onStart: getAllServiceRequestAction.type,
      onSuccess: getAllServiceRequestSuccessAction.type,
      onError: getAllServiceRequestFailedAction.type,
    })
  );
};

export const getBillById = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/get-bill`,
      method: "GET",
      params: payload.params,
      onStart: getBillByIdRequestAction.type,
      onSuccess: getBillByIdRequestSuccessAction.type,
      onError: getBillByIdRequestFailedAction.type,
    })
  );
};

export const assignTask = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/assign-task`,
      method: "PUT",
      params: payload.params,
      onStart: assignTaskRequestAction.type,
      onSuccess: assignTaskRequestSuccessAction.type,
      onError: assignTaskRequestFailedAction.type,
    })
  );
};

export const getAssignedTasks = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/assigned-tasks`,
      method: "GET",
      onStart: getAssignedTasksRequestAction.type,
      onSuccess: getAssignedTasksRequestSuccessAction.type,
      onError: getAssignedTasksRequestFailedAction.type,
    })
  );
};

export const updateTaskStatus = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/task-status`,
      method: "PUT",
      params: payload.params,
      data: payload.body,
      onStart: updateTaskStatusRequestAction.type,
      onSuccess: updateTaskStatusRequestSuccessAction.type,
      onError: updateTaskStatusRequestFailedAction.type,
    })
  );
};

export const getUsersByType = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/users-type`,
      method: "GET",
      params: payload.params,
      onStart: getUsersByTypeRequestAction.type,
      onSuccess: getUsersByTypeRequestSuccessAction.type,
      onError: getUsersByTypeRequestFailedAction.type,
    })
  );
};
