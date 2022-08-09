const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// login page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});
// register
// app.post('/', (req, res) => {
//   res.status(200).sendFile(path.resolve)
// })

// redirect to user page to search and add

// global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express Error handler caught in unknown middleware err',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errObj = Object.assign(defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
