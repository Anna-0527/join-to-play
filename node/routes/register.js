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

  let member_sid = 0; // 預設值為 0
  let subQuery = `
  (SELECT * FROM product_likes WHERE member_sid=0) pl `;

  if (res.locals.jwt && res.locals.jwt.id) {
    // 如果有 JWT 授權
    subQuery = `
    (SELECT * FROM product_likes WHERE member_sid=${res.locals.jwt.id}
    ) pl `;
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
  const sql = `SELECT COUNT(1) totalRows FROM address_book ab ${where}`;
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

// 這是路由
router.get("/", async (req, res) => {
  res.locals.pageName = "ab_list";
  res.locals.title = "通訊錄列表 — " + res.locals.title;

  const data = await getListData(req, res);
  if (data.redirect) {
    return res.redirect(data.redirect);
  }
  if (req.session.admin) {
    res.render("address-book/list", data);
  } else {
    res.render("address-book/list-no-admin", data);
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
      ingo: "無效的參數",
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

// 呈現新增資料的表單
router.get("/register", async (req, res) => {
  res.locals.pageName = "register";
  res.locals.title = "會員註冊 " + res.locals.title;
  res.render("member/register");
});
// 處理新增資料的表單
router.post("/register", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };
  // TODO: 資料格式檢查
  const formSchema = z.object({
    name: z.string().min(2, { message: "名字長度要大於等於 2" }),
    email: z.string().email({ message: "請填寫正確的 email" }),
    mobile: z
      .string()
      .regex(/^09\d{2}-?\d{3}-?\d{3}$/, { message: "請填寫正確的手機號碼" }),
  });

  const parseResult = formSchema.safeParse(req.body);
  if (!parseResult.success) {
    output.issues = parseResult.error.issues;
    return res.json(output);
  }

  let birthday = dayjs(req.body.birthday, "YYYY-MM-DD", true); // dayjs 物件
  birthday = birthday.isValid() ? birthday.format("YYYY-MM-DD") : null;
  req.body.birthday = birthday; // 置換處理過的值

  // 時間格式預設不能為空值,要改為允許為空值
  /*
  // 新增資料的第一種作法
  const sql =
    "INSERT INTO `address_book`(`name`, `email`, `mobile`, `birthday`, `address`, `created_at`) VALUE (?,?,?,?,?,NOW()) ";
  const [result] = await db.query(sql, [
    req.body.name,
    req.body.email,
    req.body.mobile,
    req.body.birthday,
    req.body.address,
  ]);
  */
  // 新增資料的第二種作法
  const sql2 = "INSERT INTO `member` SET ?"; // 屬性對應到欄位
  req.body.created_at = new Date(); // 新增屬性 created_at (欄位名稱)
  let result;

  const newMember = {
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    nickname: req.body.nickname,
    address: req.body.address,
    password: req.body.password,
    gender: req.body.gender,
    birthday: req.body.birthday,
    tag_id: req.body.tag_id,
    // agree: req.body.agree,
  };

  try {
    [result] = await db.query(sql2, [newMember]);
    output.success = !!result.affectedRows;
  } catch (ex) {
    output.error = ex.toString();
  }
  /*
{
   "fieldCount": 0,
   "affectedRows": 1, // 新增的列數
   "insertId": 1031,  // 此筆新增資料的 PK
   "info": "",
   "serverStatus": 2,
   "warningStatus": 0,
   "changedRows": 0
}
*/

  res.json(output);
});
// 要處理 multipart/form-data
router.post("/add/multi", upload.none(), async (req, res) => {
  res.json(req.body);
});


// 使用 zod 資料驗證工具
router.get("/zod", (req, res) => {
  const strSchema = z.string().min(4, { message: "請填寫長度4以上字串" });

  res.json({
    result: strSchema.safeParse("1324"),
  });
});

export default router;
