import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import styles from './MainLayout.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';


const Component = ({children}) => (
  <div>
    <AppBar style={{ boxShadow: 'none'}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Header/>
        </Toolbar>
      </Container>
    </AppBar>

    <Container maxWidth="lg" className={styles.main}>
      <a name="top"></a>
      <Toolbar/>
      <Container className={styles.content}>
        {children}
        <Footer />
      </Container>
    </Container>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
};


export {
  Component as MainLayout,
};