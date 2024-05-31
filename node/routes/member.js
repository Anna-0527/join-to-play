import express from "express";
import db from "./../utils/mysql2-connect.js";
import upload from "./../utils/upload-imgs.js";
import dayjs from "dayjs";
import z from "zod";
import bcrypt from "bcryptjs";

const router = express.Router();

/*
如果以同時查詢 [加到最愛] 的資料
通訊錄當作產品

SELECT ab.*, pl.sid like_sid FROM `address_book` ab 
LEFT JOIN  (
  SELECT * FROM `product_likes` WHERE member_sid=?) pl ON ab.sid= pl.product_sid
ORDER BY ab.sid DESC LIMIT 0, 25

*/

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

// 呈現新增資料的表單
router.get("/add", async (req, res) => {
  res.locals.pageName = "ab_add";
  res.locals.title = "註冊會員 " + res.locals.title;
  res.render("member/register-form");
});
// 處理新增資料的表單
router.post("/add", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };
  // TODO: 資料格式檢查
  const formSchema = z.object({
    username: z.string().min(2, { message: "名字長度要大於等於 2" }),
    email: z.string().email({ message: "請填寫正確的 email" }),
    mobile: z
      .string()
      .regex(/^09\d{2}-?\d{3}-?\d{3}$/, { message: "請填寫正確的手機號碼" }),
    password: z.string().min(6, { message: "密碼長度要大於等於 6" }), // 新增密碼檢查
  });

  const parseResult = formSchema.safeParse(req.body);
  if (!parseResult.success) {
    output.issues = parseResult.error.issues;
    return res.json(output);
  }

  let birthday = dayjs(req.body.birthday, "YYYY-MM-DD", true); // dayjs 物件
  birthday = birthday.isValid() ? birthday.format("YYYY-MM-DD") : null;
  req.body.birthday = birthday; // 置換處理過的值

  try {
    // 將使用者密碼轉換成雜湊值
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

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
  } catch (error) {
    output.error = error.toString();
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

// POST - 上傳會員頭像
router.post(
  "/upload/avatar",
  upload.single("avatar"),
  async function (req, res) {
    const output = {
      success: false,
      postData: req.body,
      error: "",
      code: 0,
    };

    if (req.file) {
      const id = req.body.id;
      console.log(id);
      const filename = req.file.filename; // 從 req.file 中取得檔案名稱
      console.log(id);
      const sqlAvatar = "UPDATE `member` SET avatar=? WHERE id =?";
      console.log(id, filename, sqlAvatar);
      const updateMember = [req.body.avatar, req.params.id];

      try {
        const [resultAvatar] = await db.query(sqlAvatar, [...updateMember]);
        if (resultAvatar.affectedRows > 0) {
          console.log("檔案名稱已成功儲存到資料表member的avatar欄位中");
          return res.json({
            status: "success",
            data: { avatar: filename }, // 返回檔案名稱
          });
        } else {
          console.log("無法更新資料表member的avatar欄位");
          return res.json({ status: "fail", data: null });
        }
      } catch (ex) {
        console.error("更新資料表member的avatar欄位時出錯:", ex);
        return res.json({ status: "fail", data: null });
      }
    } else {
      return res.json({ status: "fail", data: null });
    }
  }
);

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

// 修改資料
router.put("/:id", async (req, res) => {
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

  const sql =
    "UPDATE `member` SET password=?, nickname=?, tag_id=?, mobile=?, address=? WHERE id=?";
  const updateMember = [
    req.body.password,
    req.body.nickname,
    req.body.tag_id,
    req.body.mobile,
    req.body.address,
    req.params.id,
  ];

  try {
    const [result] = await db.query(sql, updateMember);
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
router.get("/:id", async (req, res) => {
  // id從token過來
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

// TODO 再修改
// id從token過來
// router.get("/api", async (req, res) => {
//   // 檢查是否存在 token
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.status(401).json({ success: false, message: "Token not provided" });
//   }

//   // 解析 token，獲取用戶 ID
//   let userId;
//   try {
//     const decoded = decodeToken(token); // 解析 token 的函式
//     userId = decoded.id; // 假設解析後的結果中有 userId 屬性
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }

//   // 使用用戶 ID 查詢資料庫
//   const sql = `SELECT * FROM member WHERE id=${userId}`;
//   try {
//     const [rows] = await db.query(sql);
//     if (!rows.length) {
//       return res.json({ success: false, message: "Member not found" });
//     }

//     const r = rows[0];
//     const d = dayjs(r.birthday);
//     r.birthday = d.isValid() ? d.format("YYYY-MM-DD") : "";

//     res.json({ success: true, data: r });
//   } catch (error) {
//     console.error("Database query error:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

export default router;
