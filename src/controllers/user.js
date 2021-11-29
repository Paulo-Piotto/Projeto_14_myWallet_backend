import connection from '../database/database.js';

async function getUser(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.sendStatus(401);
  }

  try {
    const result = await connection.query('SELECT sessions.*, users.name FROM sessions JOIN users ON sessions."userId" = users.id WHERE token = $1', [token]);
    const session = result.rows[0];

    if (session) {
      res.send(session);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  getUser,
};
