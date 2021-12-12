import axios from "axios";
import { isEmpty } from "lodash";
import Cookies from "universal-cookie";

// project imports
import * as actions from "../api";

const cookie = new Cookies();

const headers = () => {
  const cookies = cookie.get("auth_cookie");
  return {
    "Cache-Control": "no-cache",
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: isEmpty(cookies) ? "" : `bearer ${cookies}`,
  };
};

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, params, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL: "http://localhost:5000/api",
        url,
        method,
        data,
        headers: headers(),
        params: params,
        withCredentials: true,
      });
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General
      const { data: { message = "" } = {} } = error.response;
      message && dispatch(actions.apiCallFailed(message));
      // Specific
      if (onError) dispatch({ type: onError, payload: message });
    }
  };

export default api;
