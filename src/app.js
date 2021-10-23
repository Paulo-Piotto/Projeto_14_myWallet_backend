import express from 'express';
import cors from 'cors';
import { postUser } from './controllers/signUp.js';
import { logUser } from './controllers/signIn.js';
import { postTransaction } from './controllers/transactions.js';

const app = express();
app.use(cors());
app.use(express.json());


app.post('/sign-up', postUser);

app.post('/sign-in', logUser);

app.post('/transactions', postTransaction);

app.listen(4000);