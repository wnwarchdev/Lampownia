import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Item.module.scss';

const Component = ({ product }) => {
  const { image, name, price, _id } = product;
  return (
    <Link to={`${process.env.PUBLIC_URL}/products/${_id}`} className={styles.root}>
      <div className={styles.card}>
        <img src={`/img/Products/${name}/${image}.jpf`} alt={`IMG of ${name}`} className={styles.image} />
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.price}>{`${price} PLN`}</p>
      </div>
    </Link>
  );
};


Component.propTypes = {
  name: PropTypes.string,
  _id: PropTypes.any,
  product: PropTypes.object,
};

export {
  Component as Item,
};