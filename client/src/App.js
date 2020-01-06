import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router></Router>
    </Provider>
  );
}

export default App;
