import connection from "../database/database.js";
import dayjs from "dayjs";
import joi from 'joi'

async function postTransaction(req, res){
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');
    const body = req.body;
    const transactionSchema = joi.object({
        value: joi.number().required(),
        description: joi.string().min(1).required()
    })

    if(!token){
        res.sendStatus(401);
    }

    try {
       const result = await connection.query('SELECT * FROM sessions WHERE token = $1', [token])
       const session = result.rows[0];

       if(session){
           const date = dayjs().format();
           if(!transactionSchema.validate(body).error){
               await connection.query('INSERT INTO transactions ("userId", value, description, date) VALUES ($1, $2, $3, $4)', [session.userId, body.value.toFixed(2), body.description, date])
               res.sendStatus(200);
           }else{
               res.sendStatus(400)
           }
           
       }else{
           res.sendStatus(401);
       }
    } catch (error) {
        res.sendStatus(500);
    }
}

export{
    postTransaction,
}