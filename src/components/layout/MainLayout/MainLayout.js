import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './MainLayout.module.scss';
import { Header } from '../Header/Header';

const Component = ({className, children}) => (
  <div className={styles.root}>
    <AppBar style={{ boxShadow: 'none'}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Header/>
        </Toolbar>
      </Container>
    </AppBar>

    <Container maxWidth="lg">
      <Toolbar/>
      {children}
    </Container>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};