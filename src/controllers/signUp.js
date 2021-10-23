import connection from "../database/database.js";
import bcrypt from "bcrypt";

async function postUser(req, res){
  const {
      name,
      email,
      password
  } = req.body;

  const passwordHash = bcrypt.hashSync(password, 12);

  try {
    const result = await connection.query('SELECT * FROM users WHERE email = $1', [email])
    if(result.rowCount > 0){
      res.sendStatus(409);
    }else{
      await connection.query('INSERT INTO users (name, email, password) VALUES ($1 , $2, $3)', [name, email, passwordHash]);
      res.sendStatus(201);
    }
    
  } catch (error) {
      res.sendStatus(500);
  }
}


export {
    postUser,
}