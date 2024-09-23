// Konfiguration + imports
import express from 'express';
import { router } from './products.js';
const app = express();
const port = 1338;
// Middleware
app.use(express.json()); // lägger saker i req.body
app.use('/', (req, res, next) => {
    console.log(`${req.method}  ${req.url} `, req.body);
    next();
});
// Endpoints - importeras från separata filer!
app.use('/products', router);
// Starta servern
app.listen(port, () => {
    console.log('Product API server is online on port ' + port);
});
