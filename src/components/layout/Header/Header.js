import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Logo } from '../../common/Logo/Logo';

import styles from './Header.module.scss';

const Component = () => (
  <div className={styles.root}>
    <div className={styles.root}>
      <div className={styles.group}>
        <Button className={styles.logo} disableRipple='true' style={{ backgroundColor: 'transparent' }}  component={NavLink} exact to={`${process.env.PUBLIC_URL}/`} activeClassName='active'>
          <Logo/>
          LAMPOWNIA
        </Button> 
      </div>
      <div>
        <Button className={styles.link} component={NavLink} to={`${process.env.PUBLIC_URL}/cart`} activeClassName='active'>CART</Button>
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