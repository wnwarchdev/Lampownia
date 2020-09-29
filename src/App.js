import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import {AnimatedSwitch} from 'react-router-transition';

import { store } from './redux/store';

import styles from './App.model.scss';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { NotFound } from './components/views/NotFound/NotFound';
import { Product } from './components/views/Product/Product';
import { Cart } from './components/views/Cart/Cart';
import { Order } from './components/views/Order/Order';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#fff' },
    secondary: { main: '#2d2926' },
    background: {
      default: '#fff',
    },
  },

});



const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 1 }}
              atActive={{ opacity: 1 }}
              className={styles.switchWrapper}
              location={window.location}
            >
              <Route exact path='/' component={Homepage} />
              <Route exact path='/products/:id' component={Product} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/order' component={Order} />
              <Route path='*' component={NotFound} />
            </AnimatedSwitch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export { App };