import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getProduct, fetchSingleProduct } from '../../../redux/productsRedux';
import { addToCart } from '../../../redux/cartRedux';

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


class Component extends React.Component {
  state = {
    data: {
      value: 1,
    },
  }

  async componentDidMount(){
    const {fetchSingleProduct} = this.props;
    const id = this.props.match.params.id;
    console.log(id);
    await fetchSingleProduct(id);
  }

  render(){
    const {getSingleProduct, addToCart} = this.props;
    const {value} = this.state.data;
    const singleProduct = getSingleProduct[0];

    const onChange = ( event ) => {
      event.preventDefault();
      const { data } = this.state;
      this.setState({
        data: {...data, value: event.target.value,
        }});
    };

    const sendToCart = (singleProduct, value) => {
      addToCart(singleProduct, value);
    };

    return(
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
};

const mapStateToProps = (state, id) => ({
  getSingleProduct: getProduct(state, id),
});

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  addToCart: (productInformation, value) => dispatch(addToCart(productInformation, value)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Product,
};