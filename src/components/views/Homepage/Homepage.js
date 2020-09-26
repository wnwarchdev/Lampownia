import React from 'react';
import PropTypes from 'prop-types';

import { Item } from '../../common/Item/Item';

import { connect } from 'react-redux';
import { getAll, fetchProducts } from '../../../redux/productsRedux';

import styles from './Homepage.module.scss';


class Component extends React.Component {

  async componentDidMount(){
    const {fetchProducts} = this.props;
    await fetchProducts();
  }

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
  fetchProducts: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
};