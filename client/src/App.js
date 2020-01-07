import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import store from './redux/store';
import { Home, CreateUser, EditUser, Spinner } from './components';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
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
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
