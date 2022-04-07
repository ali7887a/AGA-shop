//import all the constants
import {
  REQUEST_ALL_PRODUCT,
  SUCCESS_ALL_PRODUCT,
  FAILED_ALL_PRODUCT,
  PLUSE,
  REQUEST_SIGN_UP,
  SUCCESS_SIGN_UP,
  FAILED_SIGN_UP,
  REQUEST_LOG_IN,
  SUCCESS_LOG_IN,
  FAILED_LOG_IN,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILED,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILED,
  CHANGE_INFO_REQUEST,
  CHANGE_INFO_SUCCESS,
  CHANGE_INFO_FAILED,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAILED,
  ONE_ORDERS_REQUEST,
  ONE_ORDERS_SUCCESS,
  ONE_ORDERS_FAILED,
} from "./Constant";
import {
  REQUEST_One_PRODUCT,
  SUCCESS_One_PRODUCT,
  FAILED_One_PRODUCT,
} from "./Constant";
export const AllProductsReducer = (state = { Products: [] }, action) => {
  switch (action.type) {
    case REQUEST_ALL_PRODUCT:
      return { Loading: true, ...state };
    case SUCCESS_ALL_PRODUCT:
      return { Loading: false, Products: action.payload };
    case FAILED_ALL_PRODUCT:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export const OneProductsReducer = (state = { OneProduct: [] }, action) => {
  switch (action.type) {
    case REQUEST_One_PRODUCT:
      return { Loading: true, ...state };
    case SUCCESS_One_PRODUCT:
      return { Loading: false, OneProduct: action.payload };
    case FAILED_One_PRODUCT:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export const SignUpReducer = (state = { token: {} }, action) => {
  switch (action.type) {
    case REQUEST_SIGN_UP:
      return { Loading: true, ...state };
    case SUCCESS_SIGN_UP:
      return { Loading: false, token: action.payload };
    case FAILED_SIGN_UP:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export const LogInReducer = (state = { tokenLogIn: {} }, action) => {
  switch (action.type) {
    case REQUEST_LOG_IN:
      return { Loading: true, ...state };
    case SUCCESS_LOG_IN:
      return { Loading: false, tokenLogIn: action.payload };
    case FAILED_LOG_IN:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export const CounterReducer = (state = 1, action) => {
  switch (action.type) {
    case PLUSE:
      if (action.payload < 1) {
        return 1;
      } else {
        return action.payload;
      }
    case "Reset":
      return action.payload;
    default:
      return state;
  }
};
export const RefreshReducer = (state=false, action) => {
  switch (action.type) {
    case "Refresh":
      return action.payload;
    default:
      return state;
  }
};
export const LogOutReducer = (state=true, action) => {
  switch (action.type) {
    case "logOut":
      return action.payload;
    default:
      return state;
  }
};
// get all the information of user
export const CityReducer = (state='', action) => {
  switch (action.type) {
    case "GetCity":
      return action.payload;
    default:
      return state;
  }
};
export const AddressReducer = (state='', action) => {
  switch (action.type) {
    case "GetAddress":
      return action.payload;
    default:
      return state;
  }
};
export const PhoneReducer = (state='', action) => {
  switch (action.type) {
    case "GetPhone":
      return action.payload;
    default:
      return state;
  }
};
export const PostalCodeReducer = (state='', action) => {
  switch (action.type) {
    case "GetPostalCode":
      return action.payload;
    default:
      return state;
  }
};
// create order
export const CreateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { Loading: true, ...state };
    case ORDER_CREATE_SUCCESS:
      return { Loading: false, OrderDone: action.payload };
    case ORDER_CREATE_FAILED:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
//user information 
export const UserInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { Loading: true, ...state };
    case USER_INFO_SUCCESS:
      return { Loading: false, UserInfo: action.payload };
    case USER_INFO_FAILED:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
//Change information 
export const ChangeInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_INFO_REQUEST:
      return { Loading: true, ...state };
    case CHANGE_INFO_SUCCESS:
      return { Loading: false, ChangeInfo: action.payload };
    case CHANGE_INFO_FAILED:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
//get all orders 
export const AllOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return { Loading: true, ...state };
    case ALL_ORDERS_SUCCESS:
      return { Loading: false, AllOrders: action.payload };
    case ALL_ORDERS_FAILED:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
//get One order 
export const OneOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ONE_ORDERS_REQUEST:
      return { Loading: true, ...state };
    case ONE_ORDERS_SUCCESS:
      return { Loading: false, OneOrders: action.payload };
    case ONE_ORDERS_FAILED:
      return { Loading: false, error: action.payload };
    default:
      return { ...state };
  }
};