import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({children}) => (
  <div className={styles.root}>
    <div className={styles.root}>
      
      <Button className={styles.logo} component={NavLink} exact to={`${process.env.PUBLIC_URL}/`} activeClassName='active'>LAMPOWNIA</Button> 
      <div>
        <Button className={styles.link} component={NavLink} to={`${process.env.PUBLIC_URL}/cart`} activeClassName='active'>CART</Button>
        <Button className={styles.link} component={NavLink} to={`${process.env.PUBLIC_URL}/product`} activeClassName='active' >PRODUCT</Button>
        <Button className={styles.link} component={NavLink} to={`${process.env.PUBLIC_URL}/sth`} activeClassName='active' >NFOUND</Button>
      </div>
    </div>
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
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};