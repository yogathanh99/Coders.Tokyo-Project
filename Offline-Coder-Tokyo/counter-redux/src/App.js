import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Counter from './Counter';

const initState = {
  count: 0,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default App;
