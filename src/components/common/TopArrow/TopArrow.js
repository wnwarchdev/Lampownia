import React from 'react';

import styles from './TopArrow.module.scss';

const Component = () =>
  <div className={styles.root}>
    <div className={styles.circle}>
      <div className={styles.arrow}></div>
    </div>
  </div>;

export {
  Component as TopArrow,
};

