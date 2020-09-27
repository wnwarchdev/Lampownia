import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';
import { getCart, sendOrder} from '../../../redux/cartRedux';

//import styles from './Order.module.scss';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { Redirect } from 'react-router';

function createData(name, price, value, total, id) {
  return { name, price, value, total, id };
}

class Component extends React.Component {
  state = {
    order: {
      name: '',
      surname: '',
      email: '',
      adress: '',
      city: '',
      postcode: '',
      message: '',
    },
  };

  changeInput = (event, name) => {
    event.preventDefault();
    const { order } = this.state;

    this.setState({ order: { ...order, [name]: event.target.value } });
  };

  executeOrder = async () => {
    const { order } = this.state;
    const { sendOrder, productsInCart } = this.props;
    productsInCart ? 
      ((order.name && order.surname && order.email && order.adress && order.city && order.postcode) ? 
        await sendOrder({ order, productsInCart } 
        ) 
        : alert('Add more data')
      ) 
      : alert('Nothing to order');
  };

  render() {

    const { productsInCart} = this.props;
    const { changeInput, executeOrder } = this;
    const { order } = this.state;

    const rows = productsInCart ? productsInCart.map(product => createData(
      product.name,
      product.price,
      product.value,
      product.price*product.value,
      product.id)) : [];

    const totalPrice = () => {
      let sum = [];
      rows.map(row => row.total ? sum.push(row.total) : sum.push(0));
      const total = sum.reduce((a, b) => a + b, 0);
      return total;
    };

    return (

      (rows.length !== 0) ? (
        <div>
          <Paper elevation={0} >
            <h2>Order</h2>
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
                      <TableCell>{row.value}</TableCell>
                      <TableCell>{row.total}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow key="dostawa">
                    <TableCell component="th" scope="row">
                    Delivery
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>25</TableCell>
                  </TableRow>
                  <TableRow key="suma">
                    <TableCell component="th" scope="row">
                    Order total
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{totalPrice() + 25}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>


          <Grid
            container
            spacing={3}
          >
            <Grid item xs={12}>
              <TextField
                required
                id="name"
                name="name"
                label="name"
                fullWidth
                value={order.name}
                onChange={(e) => changeInput(e, 'name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="surname"
                name="surname"
                label="surname"
                fullWidth
                value={order.surname}
                onChange={(e) => changeInput(e, 'surname')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="email"
                fullWidth
                value={order.email}
                onChange={(e) => changeInput(e, 'email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="adress"
                name="adress"
                label="adress"
                fullWidth
                value={order.adress}
                onChange={(e) => changeInput(e, 'adress')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="city"
                name="city"
                label="city"
                fullWidth
                value={order.city}
                onChange={(e) => changeInput(e, 'city')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="postcode"
                name="postcode"
                label="postcode"
                fullWidth
                value={order.postcode}
                onChange={(e) => changeInput(e, 'postcode')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="message"
                name="message"
                label="message"
                multiline
                fullWidth
                value={order.message}
                onChange={(e) => changeInput(e, 'message')}
              />
            </Grid>
          </Grid>

          <div>
            <Button>BACK</Button>
            <Button onClick={() => {executeOrder(order, productsInCart); alert('ok!'); } } >ORDER</Button>
          </div>

        </div>
      ) : (
        <div>
          <Redirect to={`${process.env.PUBLIC_URL}/`}/>
          {/* {alert('Please choose items first...')} */}
        </div>
      )
    );
  }
}

Component.propTypes = {
  productsInCart: PropTypes.array,
  sendOrder: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
  productsInCart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  sendOrder: ({ order, productsInCart }) => dispatch(sendOrder({ order, productsInCart })),
});

const Container = (connect(mapStateToProps, mapDispatchToProps)(Component));


export {
  Container as Order,
};