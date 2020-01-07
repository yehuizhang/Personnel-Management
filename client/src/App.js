import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import store from './redux/store';
import { Home, CreateUser, EditUser, Notifier, Spinner } from './components';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={5}>
        <Router>
          <Switch>
            <Route exact path="/create-user" component={CreateUser} />
            {/* <Route exact path="/edit-user/:id" component={EditUser} />
            <Route path="/" component={Home} /> */}
          </Switch>
        </Router>
        <Spinner />
        <Notifier />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
