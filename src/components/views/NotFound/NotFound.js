import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

import styles from './NotFound.module.scss';

const Component = ({className}) => (
  <div className={styles.root}>
    <div className={styles.container}>
      <h2>404: NOT FOUND</h2>
      <br></br>
      <Button
        className={styles.button}
        component={NavLink}
        exact
        to={`${process.env.PUBLIC_URL}/`}>
        Powrót
      </Button>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as NotFound,
};