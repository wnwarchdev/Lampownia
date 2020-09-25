import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#f0bf4d' },
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Homepage} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export { App };