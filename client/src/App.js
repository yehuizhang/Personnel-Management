import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import store from './redux/store';
import { Home, CreateUser, EditUser, Notifier } from './components/containers';
import { Spinner } from './components/layout';
import { loadOfficers } from './redux/actions/officers';
import { setAlert } from './redux/actions/notifier';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
  },
});

function App({ loadOfficers, setAlert }) {
  useEffect(() => {
    loadOfficers(setAlert);
  }, []);

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

export default connect(null, { loadOfficers, setAlert })(App);
