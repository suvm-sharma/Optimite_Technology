const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  // console.log(req.headers);
  next();
});

app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/user', userRoutes);

module.exports = app;
