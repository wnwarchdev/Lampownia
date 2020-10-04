import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import styles from './Footer.module.scss';

import { TopArrow } from '../../common/TopArrow/TopArrow';


const Component = () => {

  return(
    <footer className={styles.root}>
      <div className={styles.footerLinks}>
        <Button className={styles.button} component={NavLink} to={`${process.env.PUBLIC_URL}/about`} activeClassName='active'>O NAS</Button>
        <Button className={styles.button} component={NavLink} to={`${process.env.PUBLIC_URL}/faq`} activeClassName='active'>FAQ</Button>
        <Button className={styles.button} href={`https://www.facebook.com`} activeClassName='active'>FACEBOOK</Button>
      </div>
      <div>
        <span className={styles.copyright}>© Lampownia 2020</span>
        <Button style={{ backgroundColor: 'transparent' }}  disableRipple={true} className={styles.button} href="#top">
          <TopArrow/>
        </Button>
      </div>
    </footer>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Footer,
};
