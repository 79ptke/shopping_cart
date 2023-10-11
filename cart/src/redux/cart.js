const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART = 'UPDATE_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItemSave')) || [],
  cartCount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedCartItems = [...state.cartItems, action.payload];
      localStorage.setItem('cartItemSave', JSON.stringify(updatedCartItems));
      console.log('Saved to localStorage:', updatedCartItems);
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        cartCount: state.cartCount + 1,
      };
    case UPDATE_CART: 
      localStorage.setItem('cartItemSave', JSON.stringify(action.payload));
      return {
        ...state,
        cartItems: action.payload,
    };
    case REMOVE_FROM_CART:
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem('cartItemSave', JSON.stringify(filteredCartItems));
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
        cartCount: state.cartCount - 1,
      };
    default:
      return state;
  }
};

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const increaseQuantity = (item) => ({
  type: UPDATE_CART,
  payload: item,
});

export const decreaseQuantity = (item) => ({
  type: UPDATE_CART,
  payload: item,
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});


export default cartReducer;


