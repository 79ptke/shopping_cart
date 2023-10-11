const ADD_TO_CART = 'ADD_TO_CART';

const initState = {
  cartCount: 0,
};

const addItem = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartCount: state.cartCount + 1,
      };
    default:
      return state;
  }
};

export const addToCart = () => ({
  type: ADD_TO_CART,
});

export default addItem;
