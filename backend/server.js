const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');


const router = require('./routes/products.routes');
const orderRouter = require('./routes/order.routes');
const app = express();



/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());


/* API ENDPOINTS */
app.use('/api', router);
app.use('/api', orderRouter);


/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});


/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
const dbURI = process.env.NODE_ENV === `production` ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cfcxb.mongodb.net/lampownia?retryWrites=true&w=majority` : `mongodb://localhost:27017/lampownia`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;




app.use(session({ 
  secret: 'shhh!',
  store: new MongoStore({ mongooseConnection: db }),
}));


db.once('open', () => {
  console.log('Successfully connected to the db');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on: '+port);
});
