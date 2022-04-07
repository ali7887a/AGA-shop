import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {
  AllProductsReducer,
  OneProductsReducer,
  CounterReducer,
  RefreshReducer,
  SignUpReducer,
  LogOutReducer,
  LogInReducer,
  CityReducer,
  AddressReducer,
  PhoneReducer,
  PostalCodeReducer,
  CreateOrderReducer,
  UserInfoReducer,
  ChangeInfoReducer,
  AllOrdersReducer,
  OneOrdersReducer,
} from "./reducer";

const reducers = combineReducers({
  AllProducts: AllProductsReducer,
  OneProduct: OneProductsReducer,
  count: CounterReducer,
  Refresh: RefreshReducer,
  SignUp: SignUpReducer,
  LogOut: LogOutReducer,
  LogIn: LogInReducer,
  City: CityReducer,
  Address: AddressReducer,
  Phone: PhoneReducer,
  PostalCode: PostalCodeReducer,
  Order: CreateOrderReducer,
  UserInfo: UserInfoReducer,
  ChangeInfo:ChangeInfoReducer,
  AllOrders: AllOrdersReducer,
  OneOrder:OneOrdersReducer
});
const initialStates = {};
const middlewares = [thunk];
export const store = createStore(
  reducers,
  initialStates,
  composeWithDevTools(applyMiddleware(...middlewares))
);
