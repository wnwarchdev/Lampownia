import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getCart, cartFromLocal} from '../../../redux/cartRedux';

import styles from './CartCounter.module.scss';

import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';



function createData(name, price, quantity) {
  return { name, price, quantity};
}

class Component extends React.Component {
  

  componentDidMount() {
    this.props.cartFromLocal();
  }


  render(){
    const { cartItems} = this.props;


    const items = cartItems ? cartItems.map(product => createData(
      product.name,
      product.price,
      product.quantity)) : [];
  
  
    return(
      <div className={styles.root}>
        <Button className={styles.button} component={NavLink} to={`${process.env.PUBLIC_URL}/cart`} activeClassName='active'>
          KOSZYK:&#8239;<strong>{items.length}</strong>
          <div className={styles.tooltip}>
            {items.map((row) => (
              <div key={row.name} className={styles.row}>
                <span className={styles.span}>{row.name}: <strong>{row.quantity}</strong></span>
              </div>
            ))}
          </div>
        </Button>
      </div>
    );
  }
}



Component.propTypes = {
  cartItems: PropTypes.array,
  cartFromLocal: PropTypes.func,
};

const mapStateToProps = state => ({
  cartItems: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  cartFromLocal: () => dispatch(cartFromLocal()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as CartCounter,
};