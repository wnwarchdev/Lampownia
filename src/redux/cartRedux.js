import Axios from 'axios';
import { api } from '../settings';

/* selectors */
export const getCart = ({cart}) => cart.data;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const CHANGE_VALUE = createActionName('CHANGE_VALUE');
const CLEAR_CART = createActionName('CLEAR_CART');
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_ORDER = createActionName('ADD_ORDER');

/* action creators */
export const addToCart = (payload, value) => ({ payload, value, type: ADD_TO_CART });
export const changeValue = (payload) => ({ payload, type: CHANGE_VALUE });
export const clearCart = (payload) => ({ payload, type: CLEAR_CART });
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addOrder = (payload) => ({ payload, type: ADD_ORDER });

/* thunks */
export const cartToLocal = (cart) => () => {
  localStorage.setItem(`cart`, JSON.stringify(cart));
};

export const cartFromLocal = () => {
  return (dispatch) => {
    dispatch(fetchSuccess(JSON.parse(localStorage.getItem('cart'))));
  };};

export const addCartToLocal = (cart, value) => () => {
  const createObject = {...cart, value};
  let arr = [];
  arr = JSON.parse(localStorage.getItem('cart')) || [];
  const newArr = arr.filter(a => a._id !== createObject._id);
  newArr.push(createObject);
  localStorage.setItem(`cart`, JSON.stringify(newArr));
};

export const sendOrder = (order) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .post(`${api.url}/${api.order}`, order)
      .then(res => {
        dispatch(addOrder(order));
        console.log(order);
        localStorage.setItem(`cart`, JSON.stringify([]));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};


/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {

    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }

    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }

    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    case ADD_TO_CART: {
      const { products } = statePart;
      if(products){
        let CartChecker = false;
        for (const product of products) {
          if (product.id === action.payload.id) CartChecker = true;
        }
        return {
          ...statePart,
          products: CartChecker
            ?
            [...products]
            :
            [...products, { ...action.payload, value: action.value }],
        };
      } 
      return {
        ...statePart,
        products: [{ ...action.payload, value: action.value}],
      };
    }


    case CHANGE_VALUE: {
      return {
        ...statePart,
        data: statePart.data.map((product) => {
          if (product._id === action.payload._id)
            return { ...product, value: action.payload.value };
          return product;
        }),
      };
    }


    case CLEAR_CART: {
      return {
        ...statePart,
        data: statePart.data.filter((product) => product._id !== action.payload),
      };
    }

    case ADD_ORDER: {
      return {
        ...statePart,
        data: [],
        order: action.payload,
      };
    }


    default:
      return statePart;
  }
};