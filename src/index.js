import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';

store.subscribe(() => {
  console.log('Store was changed');
});

// store.dispatch({

// })

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
