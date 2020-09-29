import React from 'react';

import styles from './Loading.module.scss';

const Component = () =>
  <div className={styles.root}>
    <div className={styles.loading}></div>
  </div>;

export {
  Component as Loading,
};

