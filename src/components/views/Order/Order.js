import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';
import { getCart, sendOrder} from '../../../redux/cartRedux';

import styles from './Order.module.scss';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

function createData(name, price, quantity, total, id) {
  return { name, price, quantity, total, id };
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
      delivery: '100',
    },
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  changeInput = (event, name) => {
    event.preventDefault();
    const { order } = this.state;

    this.setState({ order: { ...order, [name]: event.target.value } });
  };

  charCounter(event) {
    let input = event.target.value;
    this.setState({
      charactersLeft: 50 - input.length,
    });
  }

  executeOrder = async () => {
    const { order } = this.state;
    const { sendOrder, productsInCart } = this.props;
    productsInCart ? 
      ((order.name && order.surname && order.email && order.adress && order.city && order.postcode) ? 
        await sendOrder({ order, productsInCart } 
        ) 
        : await sendOrder({ order, productsInCart } )
      ) 
      : alert('Nothing to order');
  };

  render() {

    const { productsInCart} = this.props;
    const { changeInput, executeOrder} = this;
    const { order } = this.state;

    const rows = productsInCart ? productsInCart.map(product => createData(
      product.name,
      product.price,
      product.quantity,
      product.price*product.quantity,
      product.id)) : [];

    const count = productsInCart ? productsInCart.map(product => createData(
      product.name)) : [];
    console.log(count.name);


    const totalPrice = () => {
      let sum = [];
      rows.map(row => row.total ? sum.push(row.total) : sum.push(0));
      const total = sum.reduce((a, b) => a + b, 0);
      return total;
    };
    console.log(this.state.order.delivery);

    const translateDelivery = () => {
      const deliState = this.state.order.delivery;
      const deliCost = parseInt(deliState);
      return deliCost;
    };

    return (

      (rows.length !== 0) ? (
        <div className={styles.root}>
          <h1 className={styles.center}>Zamówienie: {totalPrice() + translateDelivery()} PLN</h1>
          

          <div className={styles.order}>
            <TableContainer className={styles.grayed} >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.center}>Produkt</TableCell>
                    <TableCell className={styles.center}>Cena PLN</TableCell>
                    <TableCell className={styles.center}>Ilość</TableCell>
                    <TableCell className={styles.center}>Razem PLN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className={styles.center}>
                        <strong>{row.name}</strong>
                      </TableCell>
                      <TableCell className={styles.center}>{row.price}</TableCell>
                      <TableCell className={styles.center}>{row.quantity}</TableCell>
                      <TableCell className={styles.center}>{row.total}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow key="dostawa">
                    <TableCell className={styles.center}><strong>Dostawa</strong></TableCell>
                    <TableCell className={styles.center}>{translateDelivery()} </TableCell>
                    <TableCell className={styles.center}></TableCell>
                    <TableCell className={styles.centerLast}><strong>{totalPrice() + translateDelivery()}</strong></TableCell>
                  </TableRow>
                  {/* <TableRow key="suma">
                    <TableCell className={styles.center}></TableCell>
                    <TableCell className={styles.center}></TableCell>
                    <TableCell className={styles.center}></TableCell>
                    <TableCell className={styles.center}><h4>{totalPrice() + translateDelivery()}</h4></TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={styles.message}>
              <TextField
                xs={4}
                required
                id="message"
                name="message"
                label="Wiadomość"
                className={styles.noBorder}
                square={true}
                multiline
                fullWidth
                value={order.message}
                onChange={(e) => changeInput(e, 'message')}
              />
            </div>
          </div>



          <Grid
            container
            spacing={3}
            className={styles.grid}
          >
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Imię"
                fullWidth
                value={order.name}
                onChange={(e) => changeInput(e, 'name')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="surname"
                name="surname"
                label="Nazwisko"
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
                label="Email"
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
                label="Adres"
                multiline
                fullWidth
                value={order.adress}
                onChange={(e) => changeInput(e, 'adress')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="city"
                name="city"
                label="Miasto"
                fullWidth
                value={order.city}
                onChange={(e) => changeInput(e, 'city')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="postcode"
                name="postcode"
                label="Kod pocztowy"
                fullWidth
                value={order.postcode}
                onChange={(e) => changeInput(e, 'postcode')}
              />
            </Grid>
            <Grid item xs={12}>

            </Grid>
          </Grid>

          <FormControl className={styles.delivery}>
            <RadioGroup className={styles.radioGroup} defaultValue='100' onChange={(e) => changeInput(e, 'delivery')}>
              <FormControlLabel value='100' control={<Radio />} label="Kurier 48h" />
              <FormControlLabel value='150'  control={<Radio />} label="Kurier 24h" />
              <FormControlLabel value='0'  control={<Radio />} label="Odbiór osobisty" />
            </RadioGroup>
          </FormControl>

          <div className={styles.center}>
            <Button
              className={styles.button}
              component={NavLink}
              exact
              to={`${process.env.PUBLIC_URL}/cart`}>
              Powrót
            </Button>

            <Button
              className={styles.buttonOrder}
              onClick={() => {executeOrder(order, productsInCart);} }>
                Kupuję
            </Button>
          </div>

        </div>
      ) : (
        <div>
          <Redirect to={`${process.env.PUBLIC_URL}/`}/>
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