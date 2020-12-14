import React, {useReducer} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Shop from './shop/Shop';
import Cart from './shop/Cart';

export const AppContext = React.createContext();

// Set up Initial State
const initialState = {items: [
  {
    id: 1, name: 'classic honey', price: 10, quantity: 0, image: 'ClassicHoney.jpg'
  },
  {
    id: 2, name: 'honey with lemon', price: 15, quantity: 0, image: 'honeylemon.jpg'
  },
  {
    id: 3, name: 'honey with honeycomb', price: 13, quantity: 0, image: 'honeyjar3.jpeg'
  }
]};

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            let addData = action.data.items.map(item => {
              if(item.id === action.data.id) item.quantity += 1;
              return item;
            });
            return {items: addData}
        case 'REMOVE_FROM_CART':
            let remData = action.data.items.map(item => {
              if(item.id === action.data.id && item.quantity > 0) item.quantity -= 1;
              return item;
            });
            return {items: remData}
        default:
            return initialState;
    }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <div>
      <AppContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App;