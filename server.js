import mongoose from 'mongoose';
import express from 'express';
import useTransactionController from './controllers/transactionController';

const url = 'mongodb://localhost/creanetis';
const app = express();
const router = express.Router();

mongoose.connect(url, {useNewUrlParser: true});

app.use('/api', router);

app.get('/api', (req,res) => {
	res.sendFile(__dirname + '/views/index.html');
});

useTransactionController(router);

app.get('*', (req, res) => {
	res.status(404).send('Error 404 - Page not found');
});

app.listen(8080);