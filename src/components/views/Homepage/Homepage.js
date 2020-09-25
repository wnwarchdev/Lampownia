import React from 'react';
import PropTypes from 'prop-types';

import { Item } from '../../common/Item/Item';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';

import styles from './Homepage.module.scss';


class Component extends React.Component {

  render() {
    const { products } = this.props;
    return (
      <section className={styles.root}>
        {products.map(product => <Item key={product._id} product={product}  />)}
      </section>
    );
  }
}

Component.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};