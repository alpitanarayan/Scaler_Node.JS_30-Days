const express = require('express');
const app = express();

app.use((err, req, res, next) => {
  if (err instanceof PositiveIntegerError) {
    res.status(400).json({ error: err.message });
  } else {
    next(err); 
  }
});

class PositiveIntegerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PositiveIntegerError';
  }
}

function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if (Number.isNaN(number) || number <= 0) {
    next(new PositiveIntegerError('"number" must be a positive integer'));
  } else {
    res.json({ message: 'Success! Number is a positive integer.' });
  }
}

app.get('/positive', positiveIntegerHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
