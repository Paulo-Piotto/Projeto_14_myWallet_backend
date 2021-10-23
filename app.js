import pg from 'pg';
import express from 'express';
import cors from 'cors';
import joi from 'joi';

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = pg;

const connection = new Pool({
    user: 'postgres',
    password: '010101',
    host: 'localhost',
    port: 5432,
    database: 'mywallet'
});

app.get('/home', async (req, res) => {
 const result = await connection.query('SELECT * FROM sessions;');
    
    res.send(result.rows).status(200);
})

app.listen(4000);