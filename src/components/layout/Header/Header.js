import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Logo } from '../../common/Logo/Logo';

import styles from './Header.module.scss';
import { CartCounter } from '../../common/CartCounter/CartCounter';

const Component = () => (
  <header className={styles.root}>
    <div className={styles.root}>
      <div className={styles.group}>
        <Button className={styles.logo} disableRipple={true} style={{ backgroundColor: 'transparent' }}  component={NavLink} exact to={`${process.env.PUBLIC_URL}/`} activeClassName='active'>
          <Logo/>
          <h1 className={styles.logoName}>LAMPOWNIA</h1>
        </Button> 
      </div>
      <div>
        <CartCounter className={styles.button} component={NavLink} to={`${process.env.PUBLIC_URL}/cart`}/>

      </div>
    </div>
  </header>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Header,
};