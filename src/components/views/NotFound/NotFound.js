import React from 'react';
import PropTypes from 'prop-types';

import styles from './NotFound.module.scss';

const Component = ({className}) => (
  <div className={styles.root}>
    <h2>NotFound</h2>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as NotFound,
};