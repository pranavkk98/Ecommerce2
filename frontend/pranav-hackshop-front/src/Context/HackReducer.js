import {
  SET_USER,
  SET_LOADING,
  SET_ISAUTH,
  SET_TOKEN,
  SET_ALERT,
  SET_CATEGORIES,
  SET_PRODUCT,
  SET_CART,
  SET_LOCATION,
  SET_DELIVERY_SPEEDS,
  SET_ADDRESSES,
  SET_ORDER,
  SET_YOUR_ORDERS,
  LOG_OUT,
} from "./Types";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_ISAUTH:
      return {
        ...state,
        isAuth: payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    case SET_CART:
      return {
        ...state,
        cart: payload,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: payload,
      };
    case SET_DELIVERY_SPEEDS:
      return {
        ...state,
        deliverySpeeds: payload,
      };
    case SET_ADDRESSES:
      return {
        ...state,
        addresses: payload,
      };
    case SET_ORDER:
      return {
        ...state,
        order: payload,
      };
    case SET_YOUR_ORDERS:
      return {
        ...state,
        yourOrders: payload,
      };
    case LOG_OUT: {
      return {
        ...state,
        user: null,
        loading: false,
        isAuth: false,
        token: null,
      };
    }
    default:
      return state;
  }
};

export default reducer;
