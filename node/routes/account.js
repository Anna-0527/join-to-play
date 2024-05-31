import express from "express";
import db from "./../utils/mysql2-connect.js";
import upload from "./../utils/upload-imgs.js";
import dayjs from "dayjs";
import z from "zod";

const router = express.Router();

/*
如果以同時查詢 [加到最愛] 的資料
通訊錄當作產品

SELECT ab.*, pl.sid like_sid FROM `address_book` ab 
LEFT JOIN  (
  SELECT * FROM `product_likes` WHERE member_sid=?) pl ON ab.sid= pl.product_sid
ORDER BY ab.sid DESC LIMIT 0, 25

*/

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

  // 一個參數搜尋多個欄位
  let where = " WHERE 1 "; // 頭尾要空格
  if (keyword) {
    // 避免 SQL injection
    where += ` AND (
  ab.\`name\` LIKE ${db.escape(`%${keyword}%`)} 
  OR
  ab.\`mobile\` LIKE ${db.escape(`%${keyword}%`)}
  )
  `;
  }
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
  const sql = `SELECT COUNT(1) totalRows FROM member ab ${where}`;
  // SELECT COUNT(1) AS totalRows From address_book // AS 可以省略,計算資料有幾筆
  // 把第一欄位名稱改成 totalRows

  let page = +req.query.page || 1; // +轉換
  // 後端轉向
  if (page < 1) {
    redirect = "?page=1";
    return { success: false, redirect };
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
router.get("/", async (req, res) => {
  res.locals.pageName = "account";
  res.locals.title = "會員專區 — " + res.locals.title;

  const data = await getListData(req, res);
  if (data.redirect) {
    return res.redirect(data.redirect);
  }
  if (req.session.admin) {
    res.render("member/account", data);
  } else {
    res.render("member/list-no-admin", data);
  }
});

router.get("/api", async (req, res) => {
  const data = await getListData(req, res);
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({
      success: false,
      info: "無效的參數",
    });
  }

  const sql = `DELETE FROM member WHERE id=?`;
  const [result] = await db.query(sql, [id]);
  res.json(result);
  /*
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
}
*/
});

// 修改資料的表單
router.get("/edit/:id", async (req, res) => {
  const id = +req.params.id || 0;
  if (!id) {
    return res.redirect("/member");
  }
  const sql = `SELECT * FROM member WHERE id=${id}`;
  const [rows] = await db.query(sql);
  if (!rows.length) {
    return res.redirect("/member/account");
  }
  const r = rows[0];
  const d = dayjs(r.birthday);
  r.birthday = d.isValid() ? d.format("YYYY-MM-DD") : "";

  res.render("member", r);
});

// 刻意用 put 的方法
router.put("/edit/:id", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };

  let id = +req.params.id || 0;
  let birthday = dayjs(req.body.birthday, "YYYY-MM-DD", true); // dayjs 物件
  // 置換處理過的值
  req.body.birthday = birthday.isValid() ? birthday.format("YYYY-MM-DD") : null;

  const sql = "UPDATE `member` SET ? WHERE id=?";
  try {
    // 執行 SQL 時最好作錯誤處理
    const [result] = await db.query(sql, [req.body, id]);

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

// 使用 zod 資料驗證工具
router.get("/zod", (req, res) => {
  const strSchema = z.string().min(4, { message: "請填寫長度4以上字串" });

  res.json({
    result: strSchema.safeParse("1324"),
  });
});

// 取得單筆資料的 API
router.get("/member/:id", async (req, res) => {
  const id = +req.params.id || 0;
  if (!id) {
    return res.json({ success: false });
  }
  const sql = `SELECT * FROM member WHERE id=${id}`;
  const [rows] = await db.query(sql);
  if (!rows.length) {
    return res.json({ success: false });
  }
  const r = rows[0];
  const d = dayjs(r.birthday);
  r.birthday = d.isValid() ? d.format("YYYY-MM-DD") : "";
  res.json({ success: true, data: r });
});
export default router;
