import { createContext, useState, useReducer } from 'react';

const UserContext = createContext();
const TYPES = {
  add: 'add',
  delete: 'delete',
  filter: 'filter',
  deleteOne: 'deleteOne',
};
const initialUser = { id: '', first_name: '', role: '', email: '', _id: '' };

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.add: {
      const oldState = state;
      const indexItem = oldState.findIndex(
        (element) => element._id === action.payload._id
      );
      if (indexItem === -1) {
        action.payload.count = 1;
        action.payload.subtotal = action.payload.product_price;
        return [...oldState, action.payload];
      } else {
        if (oldState[indexItem].count) {
          oldState[indexItem].count += 1;
          oldState[indexItem].subtotal =
            oldState[indexItem].subtotal + action.payload.product_price;
          // action.payload.subtotal =
          //   action.payload.subtotal + action.payload.product_price;
          return [...oldState];
        } else {
          oldState[indexItem].count = 1;
        }
      }
      console.log('Add state');
      return [...oldState];
    }

    case TYPES.delete: {
      const newState = state.filter((item) => item._id !== action.payload._id);

      console.log(newState, 'DELETE');

      return newState;
    }

    case TYPES.filter:
      return state;

    case TYPES.deleteOne: {
      const oldState = state;
      const indexItem = oldState.findIndex(
        (element) => element._id === action.payload._id
      );

      oldState[indexItem].count -= 1;

      oldState[indexItem].subtotal =
        oldState[indexItem].subtotal - action.payload.product_price;

      return [...oldState];
    }

    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  // const [shoppingCarItems,setShoppingCarItems] =\

  const [shoppingCartCount, setShoppingCartCount] = useState(0);
  const [shoppingCarItems, dispatchShoppingCart] = useReducer(reducer, []);
  const [user, setUser] = useState(null);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [search, setSearch] = useState('');
  const data = {
    user,
    isLoginClicked,
    setIsLoginClicked,
    setUser,
    shoppingCarItems,
    dispatchShoppingCart,
    shoppingCartCount,
    setShoppingCartCount,
    search,
    setSearch,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider, TYPES };

export default UserContext;
