import express from "express";
import db from "./../utils/mysql2-connect.js";

import dayjs from "dayjs";

const router = express.Router();



const getListData = async (req, res) => {
  // SELECT * FROM `address_book` WHERE `name` LIKE '%詩涵%'
  let keyword = req.query.keyword || "";

  // TODO: 日期的格式檢查 , 拿到參數
  let date_begin = req.query.date_begin || null; // 空值或空字串都可以
  if (date_begin) {
    date_begin = dayjs(date_begin, "YYYY-MM-DD", true); // dayjs物件
    // 如果是合法的日期格式,就轉換為日期的字串,否則設定為空值
    date_begin = date_begin.isValid() ? date_begin.format("YYYY-MM-DD") : null;
  }
  let date_end = req.query.date_end || null;
  if (date_end) {
    date_end = dayjs(date_end, "YYYY-MM-DD", true); // dayjs 物件
    // 如果是合法的日期格式, 就轉換為日期的字串, 否則設定為空值
    date_end = date_end.isValid() ? date_end.format("YYYY-MM-DD") : null;
  }

  let member_id = 0; // 預設值為 0

  // 如果用戶有設定篩選生日的起始日期 避免被攻擊
  // 這裡沒有做篩選介面 ,有需要再做
  if (date_begin) {
    where += ` AND  ab.\`birthday\` >= ${db.escape(date_begin)} `;
  }
  // 如果用戶有設定篩選生日的結束日期
  if (date_end) {
    where += ` AND  ab.\`birthday\` <= '${date_end}' `;
  }

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 20; // 每頁最多幾筆
  const sql = `SELECT COUNT(1) totalRows FROM member st ${where}`;
  // SELECT COUNT(1) AS totalRows From address_book // AS 可以省略,計算資料有幾筆
  // 把第一欄位名稱改成 totalRows

  let page = +req.query.page || 1; // +轉換
  // 後端轉向
  if (page < 1) {
    redirect = "?page=1";
    return { success: false, redirect };
  }

  // 多層的展開 totalRows 總筆數
  const [[{ totalRows }]] = await db.query(sql);
  const totalPages = Math.ceil(totalRows / perPage); // 總頁數

  let rows = []; // 拉到函式外作宣告
  if (totalRows > 0) {
    if (page > totalPages) {
      redirect = `?page=${totalPages}`;
      return { success: false, redirect };
    }
    const sql2 = `SELECT st.*, sl.sid like_sid FROM member st
    LEFT JOIN  ${subQuery} ON st.id=sl.store_id
    
    ${where} ORDER BY sid DESC LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sql2);
  }


  // 依 sid 做降冪排序

  // res.json({ totalRows, perPage, totalPages, rows });

  return {
    success: true,
    totalRows,
    perPage,
    totalPages,
    rows,
    page,
    keyword,
    qs: req.query,
  }; // 用相對路徑, 不要斜線開頭
};

// router 的 middleware
router.use((req, res, next) => {
  // const whiteList = ["/", "/api"];
  // let path = req.url.split("?")[0]; // 去掉 query string

  // if (!whiteList.includes(path)) {
  //   // 如果沒有在白名單裡
  //   if (!req.session.admin){
  //     // 如果不再白名單哩,必須要有權限
  //     return res.status(403).send("<h1>無權訪問此頁面</h1>");
  //   }
  // }
  next();
});

// 這是路由

// 取得多筆資料的 API
router.get("/", async (req, res) => {
  const output = {
    success: false,
    action: "",
    info: "",
  };
  // 如果沒有登入
  if(! res.locals.jwt?.id) {
    output.info = "沒有登入";
    return res.json(output);
  }
  const member_sid = res.locals.jwt.id; // 會員的 primary key
  if (!member_sid) {
    return res.json({ success: false });
  }
  // const sql2 = `SELECT * FROM store_escape AS se 
  // JOIN store_likes AS sl ON sl.store_sid = se.sid 
  // JOIN member AS m ON sl.member_sid = m.id WHERE m.id=${member_sid}`;

  const sql = `SELECT * FROM store_likes 
  JOIN store_escape ON store_escape.sid = store_likes.store_sid
  WHERE store_likes.member_sid = ${member_sid}`;

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

// 刪除收藏的路由
router.delete("/del-likes", async (req, res) => {
  //概念上只會刪除收藏id
  const output = {
    sid: 0,
  };

  console.log("body", req.body);
  const sid = +req.body.sid;

  output.sid = +sid;

  const sql = `DELETE FROM store_likes WHERE sid=? `; // 用問號 會自動跳脫，值 按照順序丟到下方陣列 包成陣列是為了應付所有的SQL語法
  const [result] = await db.query(sql, [sid]);

  res.json(result);
});


export default router;
