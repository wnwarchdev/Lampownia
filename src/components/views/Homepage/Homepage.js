import React from 'react';
import PropTypes from 'prop-types';

import { Item } from '../../common/Item/Item';
import { Loading } from '../../common/Loading/Loading';

import { connect } from 'react-redux';
import { getAll, fetchProducts } from '../../../redux/productsRedux';

import styles from './Homepage.module.scss';


class Component extends React.Component {

  async componentDidMount(){
    const {fetchProducts} = this.props;
    await fetchProducts();
    await this.props.products;
    window.scrollTo(0, 0);
  }

  render() {
    const { loading, products } = this.props;
    return (
      <section className={styles.root}>
        {loading ? <Loading />
          :
          products.map(product => <Item key={product._id} product={product}  />)}
      </section>
    );
  }
}

Component.propTypes = {
  products: PropTypes.array,
  fetchProducts: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  products: getAll(state),
  loading: state.products.loading.active,
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
};