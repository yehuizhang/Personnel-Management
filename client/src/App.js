import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';
import amber from '@material-ui/core/colors/amber';

import store from './redux/store';
import { Home, CreateUser, EditUser, Notifier, Spinner } from './components';

const theme = createMuiTheme({
  palette: {
    background: {
      default: 'white',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Provider>
  );
}

export default App;
