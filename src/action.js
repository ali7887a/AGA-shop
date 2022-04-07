import axios from "axios";
//import all the constants
import {
  REQUEST_ALL_PRODUCT,
  SUCCESS_ALL_PRODUCT,
  FAILED_ALL_PRODUCT,
  REQUEST_SIGN_UP,
  SUCCESS_SIGN_UP,
  FAILED_SIGN_UP,
  REQUEST_One_PRODUCT,
  SUCCESS_One_PRODUCT,
  FAILED_One_PRODUCT,
  PLUSE,
  REQUEST_LOG_IN,
  SUCCESS_LOG_IN,
  FAILED_LOG_IN,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILED,
  ORDER_CREATE_REQUEST,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILED,
  CHANGE_INFO_REQUEST,
  CHANGE_INFO_SUCCESS,
  CHANGE_INFO_FAILED,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAILED,
  ALL_ORDERS_REQUEST,
  ONE_ORDERS_REQUEST,
  ONE_ORDERS_SUCCESS,
  ONE_ORDERS_FAILED,
} from "./Constant";
// action for get all the products
export const ActionProducts = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_ALL_PRODUCT });
    const { data } = await axios.get("http://45.138.24.15:9000/api/products");
    dispatch({ type: SUCCESS_ALL_PRODUCT, payload: data });
  } catch (error) {
    dispatch({ type: FAILED_ALL_PRODUCT, payload: error });
  }
};
// action for get one the product
export const ActionOneProduct = (x) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_One_PRODUCT });
    const { data } = await axios.get(
      `http://45.138.24.15:9000/api/products/${x}`
    );
    dispatch({ type: SUCCESS_One_PRODUCT, payload: data });
  } catch (error) {
    dispatch({ type: FAILED_One_PRODUCT, payload: error });
  }
};
//action for get the number of product
export const ActionCounter = (x, y) => (dispatch, getState) => {
  var myArray = [];
  for (var i = 0; i < Object.entries(localStorage).length; i++) {
    myArray.push(Object.entries(localStorage)[i][0]);
  }
  y
    ? dispatch({
        type: "Reset",
        payload:
          myArray.filter(
            (item) => item === getState().OneProduct.OneProduct.name
          ).length > 0
            ? +localStorage.getItem(getState().OneProduct.OneProduct.name)
            : 1,
      })
    : dispatch({
        type: PLUSE,
        payload:
          myArray.filter(
            (item) => item === getState().OneProduct.OneProduct.name
          ).length > 0
            ? +localStorage.getItem(getState().OneProduct.OneProduct.name) + +x
            : +getState().count + +x,
      });
};
export const ActionRefresh = (x) => (dispatch) => {
  dispatch({ type: "Refresh", payload: x });
};
export const ActionLogOut = (x) => (dispatch) => {
  dispatch({ type: "logOut", payload: x });
};
// action for Sign Up memeber
export const ActionSignUp = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_SIGN_UP });
    const { data } = await axios.post("http://45.138.24.15:9000/api/users", {
      name: name,
      email: email,
      password: password,
    });
    dispatch({ type: SUCCESS_SIGN_UP, payload: data });
    data.token && localStorage.setItem("token", data.token);
    data.name && localStorage.setItem("name", data.name);
  } catch (error) {
    dispatch({ type: FAILED_SIGN_UP, payload: error.response.status });
  }
};
// action for Log In memeber
export const ActionLogIn = (UserName, password) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOG_IN });
    const { data } = await axios.post(
      "http://45.138.24.15:9000/api/users/login",
      { email: UserName, password: password }
    );
    dispatch({ type: SUCCESS_LOG_IN, payload: data });
    data.token && localStorage.setItem("token", data.token);
    data.name && localStorage.setItem("name", data.name);
  } catch (error) {
    dispatch({ type: FAILED_LOG_IN, payload: error.response.status });
  }
};
// get information of user
export const ActionGetCity = (x) => (dispatch) => {
  dispatch({ type: "GetCity", payload: x });
};
export const ActionGetAddress = (x) => (dispatch) => {
  dispatch({ type: "GetAddress", payload: x });
};
export const ActionGetPhone = (x) => (dispatch) => {
  dispatch({ type: "GetPhone", payload: x });
};
export const ActionGetPostalCode = (x) => (dispatch) => {
  dispatch({ type: "GetPostalCode", payload: x });
};
// create order
export const ActionCreateOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { data } = await axios.post(
      "http://45.138.24.15:9000/api/orders",
      order,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAILED, payload: error.response.status });
  }
};
//user information
export const ActionUserInfo = () => async (dispatch) => {
  try {
    dispatch({ type: USER_INFO_REQUEST });
    const { data } = await axios.get(
      "http://45.138.24.15:9000/api/users/profile",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: USER_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_INFO_FAILED, payload: error.response.status });
  }
};
//change information
export const ActionChangeInfo = (name , email , pass) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_INFO_REQUEST });
    const { data } = await axios.put(
      "http://45.138.24.15:9000/api/users/profile",
      { name: name, email: email, password: pass },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: CHANGE_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHANGE_INFO_FAILED, payload: error.response.status });
  }
};
//get all the orders
export const ActionAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get(
      "http://45.138.24.15:9000/api/orders/myorders",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAILED, payload: error.response.status });
  }
};
//get one order
export const ActionOneOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: ONE_ORDERS_REQUEST });
    const { data } = await axios.get(
      `http://45.138.24.15:9000/api/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: ONE_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ONE_ORDERS_FAILED, payload: error.response.status });
  }
};