import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';

import ArmyTable from './containers/ArmyTable';

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
    secondary: {
      light: lightGreen[300],
      main: lightGreen[500],
      dark: lightGreen[70],
      contrastText: '#000',
    },
  },
});

function App() {
  // useEffect(() => {
  //   store.dispatch(loadOfficers(setAlert));
  // }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={5}>
          <Router>
            <Switch>
              <Route exact path="/create-user" component={CreateUser} />
              <Route exact path="/edit-user/:id" component={EditUser} />
              <Route path="/" component={ArmyTable} />
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
