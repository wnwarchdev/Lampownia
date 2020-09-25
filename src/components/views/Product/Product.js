import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';

import styles from './Product.module.scss';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const Component = ({products, match}) => {
  const product = products.filter(product => product.id === match.params.id)[0];
  console.log(product);
  console.log(product.image);
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
            <Button>
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
};

const mapStateToProps = state => ({
  products: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as Product,
};