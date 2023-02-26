const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./src/routes/users');

const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist/employee-manager'));

mongoose.connect('mongodb://localhost:27017/NewUsersDatabase', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB!');
    //mongoose.set('strictQuery', false);
  })
  .catch(err => console.error('Error while trying to connect to MongoDB!', err));



app.use("/users", userRoute);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
