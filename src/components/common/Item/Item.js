import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';

import styles from './Item.module.scss';

//import { connect } from 'react-redux';
//import { getAll } from '../../../redux/postsRedux';

const Component = ({ product }) => {
  const { image, name, price, id } = product;
  return (
    <Link to={`${process.env.PUBLIC_URL}/products/${id}`} className={styles.root}>
      <Card className={styles.card}>
        <img src={`/img/Products/${image}`} alt={`IMG of ${name}`} className={styles.image} />
        <h2>{name}</h2>
        <p>{`${price} PLN`}</p>
      </Card>
    </Link>
  );
};


Component.propTypes = {
  name: PropTypes.string,
  id: PropTypes.any,
  product: PropTypes.object,
};

//const mapStateToProps = state => ({
//  post: getAll(state),
//});

//const Container = connect(mapStateToProps)(Component);



export {
  Component as Item,
};