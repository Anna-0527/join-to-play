import express from "express";
import db from "./../utils/mysql2-connect.js";

import dayjs from "dayjs";

const router = express.Router();

// 這是路由

// 取得多筆資料的 API
router.get("/", async (req, res) => {
  // id從token過來
  const member_id = +req.query.member_id || 0;
  if (!member_id) {
    return res.json({ success: false });
  }
  // const sql2 = `SELECT * FROM store_escape AS se 
  // JOIN store_likes AS sl ON sl.store_sid = se.sid 
  // JOIN member AS m ON sl.member_sid = m.id WHERE m.id=${member_sid}`;

  const sql = `SELECT * FROM booking_escape
  WHERE member_id = ${member_id}`;

  const [rows] = await db.query(sql);
  if (!rows.length) {
    return res.json({ success: false });
  }
  const r = rows[0];
  const d = dayjs(r.birthday);
  r.birthday = d.isValid() ? d.format("YYYY-MM-DD") : "";
  res.json({ success: true, data: rows });
});

router.get("/api", async (req, res) => {
  const data = await getListData(req, res);
  res.json(data);
});



export default router;
