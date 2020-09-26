/* selectors */
export const getCart = ({cart}) => cart.products;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const CHANGE_VALUE = createActionName('CHANGE_VALUE');
const CLEAR_CART = createActionName('CLEAR_CART');

/* action creators */
export const addToCart = (payload, value) => ({ payload, value, type: ADD_TO_CART });
export const changeValue = (payload) => ({ payload, type: CHANGE_VALUE });
export const clearCart = (payload) => ({ payload, type: CLEAR_CART });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {


    case ADD_TO_CART: {
      const { products } = statePart;
      if(products){
        let CartChecker = false;
        for (const product of products) {
          if (product._id === action.payload._id) CartChecker = true;
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
        products: statePart.products.map((product) => {
          if (product._id === action.payload._id)
            return {
              ...product,
              value: action.payload.value,
            };
          return product;
        }),
      };
    }


    case CLEAR_CART: {
      return statePart;
    }


    default:
      return statePart;
  }
};