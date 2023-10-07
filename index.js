const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DataBase is connected Successfully!!');
  })
  .catch((error) => {
    console.error('Error getting from DataBase', error);
  });

const port = process.env.PORT || 1997;

app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});
