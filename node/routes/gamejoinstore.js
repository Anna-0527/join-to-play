import express from "express";
import db from "../utils/mysql2-connect.js";

const router = express.Router();

router.get('/gamejoinstore:sid', async (req, res) => {
    try {
        const sql = `
            SELECT *
            FROM game
            INNER JOIN store_escape ON game.store_id = store_escape.sid
        `;
        const [rows, fields] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        console.error('Error executing SQL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;