import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';

async function logUser(req, res) {
  const {
    email,
    password,
  } = req.body;

  try {
    const result = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.id, token]);

      const rows = await connection.query('SELECT sessions.token, users.name FROM sessions JOIN users ON sessions."userId" = users.id WHERE token = $1', [token]);
      const userData = rows.rows[0];
      res.send(userData).status(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  logUser,
};
