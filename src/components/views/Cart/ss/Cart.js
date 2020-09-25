import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';
import { getCart, changeValue } from '../../../redux/cartRedux';

import styles from './Cart.module.scss';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


function createData(name, price, quantity, total, id) {
  return { name, price, quantity, total, id };
}

const Component = ({products}) => {


  const rows = products.map(product => createData(product.name, product.price, product.quantity?product.quantity:0, product.quantity?product.price*product.quantity:product.price*0));

  return(
    <div className={styles.root}>
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
                    <input type="number" min="1" max="3">
                    </input>
                  </TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
              <TableRow key="total">
                <TableCell component="th" scope="row">
                TOTAL
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button>ORDER</Button>
      </Paper>
    </div>
  );
};

Component.propTypes = {
  products: PropTypes.array,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  changeValue: ({id, value}) => dispatch(changeValue({id, value})), 
});

const ContainerConnect = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ContainerConnect as Cart,
};