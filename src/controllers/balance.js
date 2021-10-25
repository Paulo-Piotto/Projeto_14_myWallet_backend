import connection from "../database/database.js";

async function getBalance(req, res){
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');
    let amount = {
        value: 0
    };

    if(!token){
        res.sendStatus(401);
    }

    try {
        const result = await connection.query('SELECT * FROM sessions WHERE token = $1', [token])
        const session = result.rows[0];
 
        if(session){
            const transactions = (await connection.query('SELECT * FROM transactions WHERE "userId" = $1', [session.userId])).rows;

            transactions.forEach((transaction) => {
                amount.value += Number(transaction.value);
            })

            res.send({amount, history: [...transactions]});

        }else{
            res.sendStatus(401);
        }
     } catch (error) {
         res.sendStatus(500);
     }
}

export{
    getBalance,
}