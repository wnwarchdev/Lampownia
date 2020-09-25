import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { NotFound } from './components/views/NotFound/NotFound';
import { Product } from './components/views/Product/Product';
import { Cart } from './components/views/Cart/Cart';


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
              <Route exact path='/products/:id' component={Product} />
              <Route exact path='/cart' component={Cart} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export { App };