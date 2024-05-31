import express from "express";
import db from "../utils/mysql2-connect.js";
import { z } from "zod";
import dayjs from "dayjs";

const router = express.Router();

const getListData = async (req, res) => {
  // SELECT * FROM `store_escape` WHERE `name` LIKE '%詩涵%'
  let keyword = req.query.keyword || "";

  // let member_id = 0;  // 預設值為  0
  if (res.locals.jwt && res.locals.jwt.id) {
    // 如果有 JWT 授權
    member_id = res.locals.jwt.id;
  }

  let where = " WHERE 1 ";
  if (keyword) {
    // 避免 SQL injection
    where += ` AND (
    booking_escape.\`name\` LIKE ${db.escape(`%${keyword}%`)} 
    OR
    booking_escape.\`mobile\` LIKE ${db.escape(`%${keyword}%`)}
    )
    `;
  }

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 5; // 每頁最多幾筆
  const sql = `SELECT COUNT(1) totalRows FROM booking_escape be ${where}`;
  let page = +req.query.page || 1;
  if (page < 1) {
    redirect = "?page=1";
    return { success: false, redirect };
  }

  // 多層的展開, totalRows 總筆數
  const [[{ totalRows }]] = await db.query(sql);
  const totalPages = Math.ceil(totalRows / perPage); // 總頁數

  let rows = [];
  if (totalRows > 0) {
    if (page > totalPages) {
      redirect = `?page=${totalPages}`;
      return { success: false, redirect };
    }
    const sql2 = `SELECT * FROM \`booking_escape\` 
    
    ${where} ORDER BY sid LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sql2);
  }

  return {
    success: true,
    totalRows,
    perPage,
    totalPages,
    rows,
    page,
    keyword,
    qs: req.query,
  };
};

router.get("/api", async (req, res) => {
  const data = await getListData(req, res);
  res.json(data);
});

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM booking_escape";
    const [rows, fields] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 取得修改預約的單筆資料的 API
router.get("/getEdit/:sid", async (req, res) => {
  const sid = +req.params.sid || 0;
  if (!sid) {
    return res.json({ success: false });
  }

  // const memberId = +req.params.member_id || 0;
  // if (!memberId) {
  //   return res.json({ success: false });
  // }

  // 區別兩個資料表的player_count欄位
  const sql3 = `SELECT booking_escape.player_count AS player_count_booking,
  game.player_count AS player_count_game
  FROM booking_escape
  JOIN game ON booking_escape.game_id = game.sid
  WHERE booking_escape.sid=?`;

  const sql = `SELECT be.sid,be.member_id,member.username,member.mobile,be.store_id,be.store_name,be.booking_date,be.booking_time,be.booking_hours,be.game_id,be.game_name,be.player_count,be.remark
FROM booking_escape be
JOIN store_escape ON store_escape.sid =  be.store_id
JOIN game ON game.sid  = be.game_id
JOIN member ON member.id =  be.member_id
WHERE be.sid = ?`;

  const [rows] = await db.query(sql, [sid]);
  console.log(sid);
  console.log(rows);

  if (!rows.length) {
    return res.json({ success: false });
  }
  const r = rows[0];
  const d = dayjs(r.booking_date);
  // r.booking_date = d.isValid() ? d.format("YYYY-MM-DD") : "";

  // // 在這裡執行第二個查詢
  const [additionalData] = await db.query(sql3, [r.sid]);
  // console.log(r.sid);

  // // 合併兩個查詢的結果
  const responseData = { ...r, additionalData };

  res.json({ success: true, data: responseData });
});

// 修改資料的表單
router.get("/edit/:sid", async (req, res) => {
  const sid = +req.params.sid || 0;
  if (!sid) {
    return res.redirect("/booking-escape");
  }
  const sql = `SELECT be.sid,be.member_id,member.username,member.mobile,be.store_id,be.store_name,be.booking_date,be.booking_time,be.booking_hours,be.game_id,be.game_name,be.player_count,be.remark
FROM booking_escape be
JOIN store_escape ON store_escape.sid = be.store_id
JOIN game ON game.sid = be.game_id
JOIN member ON member.id = be.member_id
  WHERE be.sid = ?`;

  const [rows] = await db.query(sql);
  if (!rows.length) {
    return res.redirect("/booking-escape");
  }
  const r = rows[0];
  // const d = dayjs(r.booking_date);
  // r.booking_date = d.isValid() ? d.format("YYYY-MM-DD") : "";
  res.render("booking-escape/edit", r);
});

router.put("/edit/:sid", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };

  let sid = +req.params.sid || 0;

  // let booking_date = dayjs(req.body.booking_date, "YYYY-MM-DD", true); // dayjs 物件
  // // 置換處理過的值
  // req.body.booking_date = booking_date.isValid()
  //   ? booking_date.format("YYYY-MM-DD")
  //   : null;
  // TODO: 資料格式檢查

  const sql = "UPDATE `booking_escape` SET ? WHERE sid=?";
  try {
    // 執行 SQL 時最好做錯誤處理
    const [result] = await db.query(sql, [req.body, sid]);
    /*
    {
      "fieldCount": 0,
      "affectedRows": 1,
      "insertId": 0,
      "info": "Rows matched: 1  Changed: 1  Warnings: 0",
      "serverStatus": 2,
      "warningStatus": 0,
      "changedRows": 1
    }
    */
    output.success = !!(result.affectedRows && result.changedRows);
  } catch (ex) {
    output.error = ex.toString();
  }
  res.json(output);
});

router.get("/zod", (req, res) => {
  const strSchema = z.string().min(4, { message: "請填寫長度四以上的字串" });

  res.json({
    result: strSchema.safeParse("12"),
  });
});

export default router;
