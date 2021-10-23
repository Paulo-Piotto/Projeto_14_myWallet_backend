import connection from "../database/database.js";
import dayjs from "dayjs";
import joi from 'joi'

async function postTransaction(req, res){
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');
    const body = req.body;
    const transactionSchema = joi.object({
        value: joi.number().required()
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

           }else{
               res.sendStatus(400)
           }
           
       }else{
           res.sendStatus(401);
       }
    } catch (error) {
        
    }
}

export{
    postTransaction,
}