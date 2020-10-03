import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll, fetchProducts } from '../../../redux/productsRedux';
import { addToCart, addCartToLocal, getCart } from '../../../redux/cartRedux';
import { NavLink } from 'react-router-dom';

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
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';



class Component extends React.Component {
  state = {
    data: {
      quantity: 1,
    },
  }

  async componentDidMount(){
    await this.props.fetchProducts();
  }

  render(){
    const {products, addToCart} = this.props;
    const {quantity} = this.state.data;
    const singleProduct = products.filter(product => product._id === this.props.match.params.id)[0];

    const onChange = ( event ) => {
      event.preventDefault();
      const { data } = this.state;
      this.setState({
        data: {...data, quantity: event.target.value,
        }});
    };

    const sendToCart = async(singleProduct, quantity) => {
      const singleProductLite = {price: singleProduct.price, name: singleProduct.name, id: singleProduct.id, _id: singleProduct._id};
      console.log(singleProductLite);
      await addToCart(singleProductLite, quantity);
      this.props.addCartToLocal(singleProductLite, quantity);
    };

    return(

      (singleProduct) ? (
    
        <div className={styles.root}>

          <div className={styles.tile}>
            <div className={styles.text}>
              <p>Ref ID: {singleProduct.id}</p>
              <h1>{singleProduct.name}</h1>
              <h4>Era: lata {singleProduct.era}-te; Kraj: {singleProduct.origin}</h4>
              <h4>Producent: {singleProduct.manufacturer}</h4>
              <p className={styles.justify}>{singleProduct.description}</p>
              <h3>{singleProduct.price} PLN</h3>

              <FormControl>
                <Select
                  className={styles.select}
                  variant="outlined" 
                  value={quantity}
                  onChange={onChange}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              
              <Button 
                className={styles.button}            
                size="small" 
                color="secondary"
                onClick={() => sendToCart( singleProduct, quantity )}>
                DO KOSZYKA
              </Button>
            </div>


          </div>




          <Carousel showIndicators={false} showThumbs={false} autoPlay infiniteLoop interval='2000' className={styles.tile}>
            {singleProduct.gallery && singleProduct.gallery.map((item, i) => (
              <div key={i} >
                <img src={`/img/Products/${singleProduct.name}/${item}.jpg`} className={styles.image} alt={`IMG ${i + 1} of ${singleProduct.name}`} />
              </div>
            ))}
          </Carousel>


          {/* <Paper>
            <Card>
              <CardActionArea>
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
                  <Select value={quantity} onChange={onChange}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
                
                <Button 
                  size="small" 
                  color="secondary"
                  onClick={() => sendToCart( singleProduct, quantity )}>
                  ADD TO CART
                </Button>
              </CardActions>
            </Card>
          </Paper> */}


          
          {singleProduct.gallery && singleProduct.gallery.map((item, i) => (
            <div key={i} className={styles.tile}>
              <img src={`/img/Products/${singleProduct.name}/${item}.jpg`} className={styles.image} alt={`IMG ${i + 1} of ${singleProduct.name}`} />
            </div>
          ))}

          <div className={styles.tile}>

            <div className={styles.text}>
              <h3>{singleProduct.name}</h3>
              <p>Kategoria: {singleProduct.category}</p>
              <p>Średnica: {singleProduct.dim.diameter} mm</p>
              <p>Wysokość: {singleProduct.dim.height} mm</p>
              <p>Waga: {singleProduct.dim.weight} kg</p>



              <p className={styles.justify}>
                Wszystkie oferowane produkty pochodzą z demontarzu obiektów i wnętrz o charakterze przemysłowym i biurowym.
                Dokładamy wszelkich starań aby produkt był kompletny, bezpiczny i sprawny, wszelkie ślady użytkowania nadają im niepowtarzalny charakter.
              </p>
              <p className={styles.justify}>
                Klasa szczelności IP20. Produkt spełnia normy bezpieczeństwa zawarte w normie EN60598. Podane wymiary są przybliżone.
              </p>

              <Button
                className={styles.button}
                size="small" 
                color="secondary"
                component={NavLink}
                exact
                to={`${process.env.PUBLIC_URL}/`}>
                Powrót
              </Button>
            </div>

          </div>
          

          
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
  fetchProducts: PropTypes.func,
  addCartToLocal: PropTypes.func,
};

const mapStateToProps = (state) => ({
  products: getAll(state),
  getCart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addToCart: (productInformation, quantity) => dispatch(addToCart(productInformation, quantity)),
  addCartToLocal: (getSingleProduct, quantity) => dispatch(addCartToLocal(getSingleProduct, quantity)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Product,
};