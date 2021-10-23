import connection from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid'

async function logUser(req, res){
   const {
       email,
       password
   } = req.body;

   try {
       const result = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
       const user = result.rows[0];

       if(user && bcrypt.compareSync(password, user.password)){
           const token = uuid();
           await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.id, token]);
           res.send(token).status(200);
       }else{
           res.sendStatus(401);
       }
   } catch (error) {
       res.send(error).status(500);
   }
}

export{
    logUser
}

//ab359f59-a4f2-444d-a079-b26935875e9d