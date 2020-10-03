import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';
import { getCart, changeQuantity, clearCart, cartFromLocal, cartToLocal } from '../../../redux/cartRedux';

//import styles from './Cart.module.scss';

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
  }

  componentDidUpdate() {
    this.props.cartToLocal(this.props.cartItems);
  }

  render(){
    const { cartItems, changeQuantity, clearCart} = this.props;
  
    const rows = cartItems ? cartItems.map(product => createData(
      product.name,
      product.price,
      product.quantity,
      product.quantity
        ?
        product.price*product.quantity:product.price*0, product._id)) : [];
  
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
      <div>
        <Paper elevation={0} >
          <h2>Cart</h2>
          <TableContainer component={Paper}>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>

                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell>{row.price}</TableCell>

                    <TableCell>
                      <FormControl>
                        <Select value={row.quantity} onChange={e => changeInput(e, row._id)}>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell>{row.total}</TableCell>

                    <TableCell>
                      <Button onClick={() => removeProduct(row._id)}>REMOVE</Button>
                    </TableCell>

                  </TableRow>
                ))}
                <TableRow key="total">
                  <TableCell component="th" scope="row">
                    TOTAL
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>{totalPrice()}</TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button component={Link} to={'/Order'} >ORDER</Button>
        </Paper>
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