import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';
import { getCart, changeQuantity, clearCart, cartFromLocal, cartToLocal } from '../../../redux/cartRedux';
import { NavLink } from 'react-router-dom';

import styles from './Cart.module.scss';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';


function createData(name, price, quantity, total, _id) {
  return { name, price, quantity, total, _id };
}


class Component extends React.Component {
  

  componentDidMount() {
    this.props.cartFromLocal();
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    this.props.cartToLocal(this.props.cartItems);
  }

  render(){
    const { cartItems, changeQuantity, clearCart} = this.props;
    console.log('cartItems: ', this.props.cartItems);
    console.log('props : ', this.props);
    console.log('state : ', this.state);
    
  
    const rows = cartItems ? cartItems.map(product => createData(
      product.name,
      product.price,
      product.quantity,
      product.quantity
        ?
        product.price*product.quantity:product.price*0, product._id)) : [];

    const rows2 = cartItems ? cartItems.map(product => createData(
      product.name)) : [];
    console.log(rows2);
  
    const changeInput = (event, _id) => {
      event.preventDefault();
      changeQuantity({_id, quantity: parseInt(event.target.value)});
    };

    const removeProduct = (_id) => {
      clearCart(_id);
    };
  
    const totalPrice = () => {
      let sum = [];
      rows.map(row => row.total ? sum.push(row.total) : sum.push(0));
      const total = sum.reduce((a, b) => a + b, 0);
      return total;
    };
  
    return(
      <div className={styles.root}>
        <h1 className={styles.center}>Koszyk</h1>
        <TableContainer >
          <Table  className={styles.table}>
            <TableHead>
              <TableRow className={styles.hideS}>
                <TableCell className={styles.center}>Produkt</TableCell>
                <TableCell className={styles.center}>Cena PLN</TableCell>
                <TableCell className={styles.center}>Ilość</TableCell>
                <TableCell className={styles.center}>Razem PLN</TableCell>
                <TableCell className={styles.center}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} className={styles.stackXs}>

                  <TableCell className={styles.center}>
                    <h4>{row.name}</h4>
                  </TableCell>

                  <TableCell className={styles.center}>
                    {row.price}
                  </TableCell>

                  <TableCell className={styles.center}>
                    <FormControl>
                      <Select disableUnderline className={styles.select} value={row.quantity} onChange={e => changeInput(e, row._id)}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell className={styles.center}>
                    {row.total}
                  </TableCell>

                  <TableCell className={styles.short}>
                    <Button onClick={() => removeProduct(row._id) } className={styles.xmark}></Button>
                  </TableCell>

                </TableRow>
              ))}
              <TableRow footer key="total" className={styles.hideS}>
                <TableCell className={styles.noBorder}></TableCell >
                <TableCell className={styles.noBorder}></TableCell>
                <TableCell className={styles.noBorder}></TableCell>
                <TableCell className={styles.center}><h4>{totalPrice()}</h4></TableCell>
                <TableCell className={styles.noBorder}></TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>



        <div className={styles.total}>
          <h3 className={styles.center}>{totalPrice()} PLN</h3>
          <Button
            className={styles.button}
            component={NavLink}
            exact
            to={`${process.env.PUBLIC_URL}/`}>
            Powrót
          </Button>

          <Button
            className={styles.buttonOrder}
            component={NavLink}
            exact
            to={'/Order'}>
              Zamawiam
          </Button>
        </div>


      </div>
    );
  }
}



Component.propTypes = {
  cartItems: PropTypes.array,
  changeQuantity: PropTypes.func,
  clearCart: PropTypes.func,
  cartFromLocal: PropTypes.func,
  cartToLocal: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
  cartItems: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  changeQuantity: ({_id, quantity}) => dispatch(changeQuantity({_id, quantity})),
  clearCart: (_id) => dispatch(clearCart(_id)),
  cartFromLocal: () => dispatch(cartFromLocal()),
  cartToLocal: (cart) => dispatch(cartToLocal(cart)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Cart,
};