import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';
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


const Component = ({products, match, addToCart}) => {
  const product = products.filter(product => product.id === match.params.id)[0];

  const [value, setValue] = React.useState(1);
  const onChange = ({ target }) => {
    setValue(target.value);
  };

  const sendToCart = (product, value) => {
    addToCart(product, value);
    // console.log ('product: ', product);
    // console.log ('value: ', value);
    // console.log ('value: ', value);
  };


  return(
    <div className={styles.root}>
      <Paper >
        <Card>
          <CardActionArea>
            <img src={`/img/Products/${product.image}`} alt={`IMG of ${product.name}`} className={styles.image}/>
            <CardContent>
              <Typography component="h1">
                {product.name}
              </Typography>
              <Typography color="textSecondary" component="p">
                {`${product.category} lamp`}
              </Typography>
              <Typography color="textSecondary" component="p">
                {`${product.description}`}
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
              onClick={() => sendToCart( product, value )}>
             ADD TO CART
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
};

Component.propTypes = {
  products: PropTypes.array,
  match: PropTypes.object,
  addToCart: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addToCart: (productInformation, value) => dispatch(addToCart(productInformation, value)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Product,
};