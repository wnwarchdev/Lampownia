import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll, fetchProducts } from '../../../redux/productsRedux';
import { addToCart, addCartToLocal, getCart } from '../../../redux/cartRedux';

import styles from './Product.module.scss';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect } from 'react-router';



class Component extends React.Component {
  state = {
    data: {
      value: 1,
    },
  }

  async componentDidMount(){
    // const {fetchSingleProduct} = this.props;
    // const id = this.props.match.params.id;
    // console.log(id);
    // await fetchSingleProduct(id);
    await this.props.fetchProducts();
  }

  render(){
    const {products, addToCart} = this.props;
    const {value} = this.state.data;
    const singleProduct = products.filter(product => product._id === this.props.match.params.id)[0];
    // console.log(singleProduct);
    // console.log(addToCart);

    const onChange = ( event ) => {
      event.preventDefault();
      const { data } = this.state;
      this.setState({
        data: {...data, value: event.target.value,
        }});
    };

    const sendToCart = async(singleProduct, value) => {
      await addToCart(singleProduct, value);
      this.props.addCartToLocal(singleProduct, value);
    };

    return(

      (singleProduct) ? (
    
        <div>
          <Paper>
            <Card>
              <CardActionArea>
                <img src={`/img/Products/${singleProduct.image}`} alt={`IMG of ${singleProduct.name}`} className={styles.image}/>
                <CardContent>
                  <Typography component="h1">
                    {singleProduct.name}
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    {`${singleProduct.category} lamp`}
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    {`${singleProduct.description}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <FormControl>
                  <Select value={value} onChange={onChange}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
                
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => sendToCart( singleProduct, value )}>
                  ADD TO CART
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </div>

      ) : (
        <Redirect to={`${process.env.PUBLIC_URL}/`}/>
      )


    );
  }
}



Component.propTypes = {
  products: PropTypes.array,
  match: PropTypes.object,
  addToCart: PropTypes.func,
  product: PropTypes.any,
  fetchItem: PropTypes.func,
  fetchSingleProduct: PropTypes.func,
  getSingleProduct: PropTypes.any,
  fetchProducts: PropTypes.func,
  addCartToLocal: PropTypes.func,
};

const mapStateToProps = (state, id) => ({
  products: getAll(state),
  getCart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addToCart: (productInformation, value) => dispatch(addToCart(productInformation, value)),
  addCartToLocal: (getSingleProduct, value) => dispatch(addCartToLocal(getSingleProduct, value)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Product,
};