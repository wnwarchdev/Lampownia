import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import styles from './Header.module.scss';

const Component = () => (
  <div className={styles.root}>
    <div className={styles.root}>
      <Button className={styles.logo} component={NavLink} exact to={`${process.env.PUBLIC_URL}/`} activeClassName='active'>LAMPOWNIA</Button> 
      <div>
        <Button className={styles.link} component={NavLink} to={`${process.env.PUBLIC_URL}/cart`} activeClassName='active'>CART</Button>
        <Button className={styles.link} component={NavLink} to={`${process.env.PUBLIC_URL}/order`} activeClassName='active'>ORDER</Button>
        <Button className={styles.link} component={NavLink} to={`${process.env.PUBLIC_URL}/products/1`} activeClassName='active' >PRODUCT</Button>
        <Button className={styles.link} component={NavLink} to={`${process.env.PUBLIC_URL}/sth`} activeClassName='active' >NFOUND</Button>
      </div>
    </div>
  </div>
);

Component.propTypes = {

  className: PropTypes.string,
};

export {
  Component as Header,
};