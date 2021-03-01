import { createContext, useReducer } from 'react';

const CartContext = createContext();
const TYPES = {
  add: 'add',
  delete: 'delete',
  filter: 'filter',
};
const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.add: {
      const oldState = state;
      const indexItem = oldState.findIndex(
        (element) => element._id === action.payload._id
      );
      if (indexItem === -1) {
        action.payload.count = 1;
        return [...oldState, action.payload];
      } else {
        if (oldState[indexItem].count) {
          oldState[indexItem].count += 1;
        } else {
          oldState[indexItem].count = 1;
        }
      }
      console.log('Add state');
      return [...oldState];
    }

    case TYPES.delete:
      return state.filter((item) => item.id !== action.payload);

    case TYPES.filter:
      return state;

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const data = {};
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};
