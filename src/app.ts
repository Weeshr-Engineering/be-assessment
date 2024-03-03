import express from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import morgan from 'morgan';

const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');

const app = express();
const port = 3000;

app.use(morgan('dev'));

//  Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// Dynamically serve all routes
readdirSync('./src/routes').map((path) => {
    app.use('/api/v1/', require(`./routes/${path}`));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
