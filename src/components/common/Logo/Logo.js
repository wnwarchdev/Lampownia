import React from 'react';

import styles from './Logo.module.scss';

const Component = () =>
  <div className={styles.root}>
    <div className={styles.halfTop}></div>
    <div className={styles.halfBottom}></div>
  </div>;

export {
  Component as Logo,
};

