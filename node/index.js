import express from "express";
import sales from "./data/sales.json" assert { type: "json" };
import upload from "./utils/upload-imgs.js";
import admin2Router from "./routes/admin2.js";
import abRouter from "./routes/address-book.js";
import productS from "./routes/product-s.js";
import orderS from "./routes/order-s.js";
import session from "express-session";
import mysql_session from "express-mysql-session";
import moment from "moment-timezone";
import dayjs from "dayjs";
import db from "./utils/mysql2-connect.js";
import cors from "cors";
import bcrypt from "bcryptjs";
// import wsServer from "./routes/ws-chat.js";
// import wsServer from "./routes/ws-draw.js";
import jwt from "jsonwebtoken";

import storeDesk from "./routes/store-desk.js"
import storeEscape from "./routes/store-escape.js"
import game from "./routes/game.js"
import bookingEscape from "./routes/booking-escape.js"
import bookingRecord from "./routes/booking-record.js"
// import gamejoinstoreEs from "./routes/gamejoinstore.js"

//新增媒合的路由
import matchRouter from "./routes/match.js"
import sendMailRouter from './routes/email-match.js'
// member的路由
import registerRouter from "./routes/member.js"
import editRouter from "./routes/member.js";
import contactRouter from "./routes/contact.js"
import trStoreRouter from "./routes/tr-store.js"
import resetPasswordRouter from './routes/reset-password.js'
import orderListRouter from './routes/order-list.js'
import bookingListRouter from './routes/booking-list.js'
// import googleLoginRouter from "./routes/google-login.js"

const MysqlStore = mysql_session(session);
const sessionStore = new MysqlStore({}, db);

const app = express();

app.set("view engine", "ejs"); // 設定使用的樣版引擎為 EJS

// *** Top level middlewares
// true: 使用 qs 套件做為解析器的核心
// false: 使用 body-parser 自己的解析器
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // console.log({origin});
    callback(null, true);
  },
};
app.use(cors(corsOptions));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "kidfk89345309ULKUJGJHiuer",
    store: sessionStore,
    /*
    cookie: {
      maxAge: 1200_000, // 單位是毫秒
    }
    */
  })
);

// 自訂頂層的中介軟體
app.use((req, res, next) => {
  res.locals.title = "小新的網站";
  res.locals.pageName = ""; // 預設值
  res.locals.session = req.session; // 把 session 資料傳到 ejs

  const authorization = req.get("Authorization"); // 取得某個 header
  if (authorization && authorization.indexOf("Bearer ") === 0) {
    const token = authorization.slice(7); // 去掉 "Bearer "

    // JWT 解密
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.jwt = payload; // 透過 res 往下傳
    } catch (ex) { }
  }
  /*
  // 測試時使用
  res.locals.jwt = {
    id: 25,
    account: "fake@test.com",
  };
  */
  next(); // 流程往下進行
});
/*
app.use(express.static("build"));
app.get("*", (req, res)=>{
  res.send(`<!doctype html><html lang="zh"><head><meta charset="utf-8"/><link rel="icon" href="/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><meta name="description" content="Shinder react hooks"/><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"/><title>Shinder react hooks</title><script defer="defer" src="/static/js/main.6a205622.js"></script></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>`);
});
*/

// 路由 (routes) 設定
// 只允許 GET 方法來拜訪這個路徑
app.get("/", (req, res) => {
  res.locals.title = "首頁 - " + res.locals.title;
  res.locals.pageName = "home";
  res.render("home", { name: 'Shinder >"<' });
});
app.get("/hello", (req, res) => {
  res.json({ name: "shin", age: 20 });
});
app.get("/a.png", (req, res) => {
  res.send("<h2>這不是一張圖</h2>");
});

app.get("/json-sales", (req, res) => {
  res.locals.title = "JSON 測試 - " + res.locals.title;
  res.locals.pageName = "json-sales";
  res.render("json-sales", { sales });
});

app.get("/try-qs", (req, res) => {
  res.json(req.query);
});

app.post("/try-post", (req, res) => {
  res.json(req.body);
});

app.get("/try-post-form", (req, res) => {
  res.locals.title = "表單資料測試 - " + res.locals.title;
  res.locals.pageName = "try-post-form";
  res.render("try-post-form");
});
app.post("/try-post-form", (req, res) => {
  res.locals.title = "表單資料測試 - " + res.locals.title;
  res.locals.pageName = "try-post-form";
  res.render("try-post-form", req.body);
});

app.post("/try-upload", upload.single("avatar"), (req, res) => {
  res.json(req.file);
});
app.post("/try-uploads", upload.array("photos"), (req, res) => {
  res.json(req.files);
});

// 嚴謹的路徑放前面
app.get("/try-params1/aaa", (req, res) => {
  res.json({ ...req.params, p: 2 });
});
app.get("/try-params1/:action?/:id?", (req, res) => {
  res.json({ ...req.params, p: 1 });
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
  let u = req.url.slice(3); // 前面三個字元不要 "/m/"
  u = u.split("?")[0]; // 在 ? 的地方切一刀, 取第一段
  u = u.split("-").join("");
  res.json({ u });
});

app.use("/admins", admin2Router);

app.get("/try-sess", (req, res) => {
  req.session.num = req.session.num || 0; // 變數沒設定, 就設定為 0
  req.session.num++;
  res.json({
    num: req.session.num,
  });
});

app.get("/sess", (req, res) => {
  res.json(req.session);
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const output = {
    success: false,
    body: req.body,
  };
  const { account, password } = req.body;

  const sql = "SELECT * FROM member WHERE email=?";
  const [rows] = await db.query(sql, [account]);

  if (!rows.length) {
    // 帳號是錯誤的
    return res.json(output);
  }

  const result = await bcrypt.compare(password, rows[0].password);
  output.success = result;
  if (result) {
    // 密碼是正確的

    // 使用 session 記住用戶
    req.session.admin = {
      id: rows[0].id,
      account,
      nickname: rows[0].nickname,
    };
  }
  res.json(output);
});

// 登入後回傳 JWT
app.post("/login-jwt", async (req, res) => {
  const output = {
    success: false,
    body: req.body,
  };
  const { email, password } = req.body;

  const sql = "SELECT * FROM member WHERE email=?";
  const [rows] = await db.query(sql, [email]);

  if (!rows.length) {
    // 帳號是錯誤的
    return res.json(output);
  }

  const result = await bcrypt.compare(password, rows[0].password);
  output.success = result;
  if (result) {
    const token = jwt.sign(
      {
        id: rows[0].id,
        email,
      },
      process.env.JWT_SECRET
    );

    // 使用 JWT
    output.data = {
      id: rows[0].id,
      email,
      username: rows[0].username,
      nickname: rows[0].nickname,
      token,
    };

    // 同時取得性別、地址和電話資訊
    const additionalInfoSql =
      "SELECT gender, address, mobile , birthday , tag_id , password , username , nickname FROM member WHERE id = ?";
    const [additionalInfoRows] = await db.query(additionalInfoSql, [
      rows[0].id,
    ]);
    output.data.gender = additionalInfoRows[0].gender;
    output.data.birthday = additionalInfoRows[0].birthday;
    output.data.address = additionalInfoRows[0].address;
    output.data.mobile = additionalInfoRows[0].mobile;
    output.data.tag_id = additionalInfoRows[0].tag_id;
    output.data.password = additionalInfoRows[0].password;
    output.data.username = additionalInfoRows[0].username;
    output.data.nickname = additionalInfoRows[0].nickname;
  }
  res.json(output);
});

app.get("/jwt-data", (req, res) => {
  res.json(res.locals.jwt);
});

app.get("/logout", (req, res) => {
  delete req.session.admin; // 移除 admin 這個屬性
  res.redirect("/");
});

app.get("/try-moment", (req, res) => {
  const fm = "YYYY-MM-DD HH:mm:ss"; // 輸出的格式
  const m1 = moment(); // 建立當下時間的 moment 物件
  const m2 = moment("2025-02-29");
  const d1 = dayjs(); // 建立當下時間的 dayjs 物件
  const d2 = dayjs("2025-02-29");

  res.json({
    m1a: m1.format(fm),
    m1b: m1.tz("Europe/London").format(fm),
    m2: m2.format(fm),
    d1: d1.format(fm),
    d2: d2.format(fm),
  });
});

app.get("/try-db", async (req, res) => {
  const sql = "SELECT * FROM address_book LIMIT 3";

  // promise 處理完後, 取得的是陣列, 第一個元素會依 sql 語法不同而異
  // SQL SELECT: 第一個值是資料的陣列, 第二個是欄位的資料
  let rows = [];
  let fields; // 通常是不需要取得欄位定義的資料
  try {
    [rows, fields] = await db.query(sql);
  } catch (ex) {
    console.log(ex);
  }

  res.json({ rows, fields });
});

app.use("/address-book", abRouter);

app.use("/product-s", productS);
app.use("/order-s", orderS);


app.use("/store-desk", storeDesk);

app.use("/store-escape", storeEscape);

app.use("/game", game);

app.use("/booking-escape", bookingEscape);

app.use("/booking-record", bookingRecord);

// app.use("/gamejoinstore", gamejoinstoreEs);

app.use("/match", matchRouter);
app.use("/email", sendMailRouter);
// 後端讀取別的伺服器的頁面
app.get("/yahoo", async (req, res) => {
  const r = await fetch("https://tw.yahoo.com/");
  const html = await r.text();
  res.send(html);
});
app.get("/104", async (req, res) => {
  const r = await fetch(
    "https://www.104.com.tw/job/7uq2f?jobsource=AD_428167_wg02_"
  );
  const html = await r.text();
  res.send(html);
});

app.get("/bcrypt1", async (req, res) => {
  const hash = await bcrypt.hash("123456", 10);
  res.json({ hash });
});

app.get("/bcrypt2", async (req, res) => {
  const hash = "$2a$10$RDjIBCpXtnpGae5af7De3.vjduM4PFqPzQbAYrXgtSzBgLJnFSj8K";
  const result = await bcrypt.compare("123456", hash);

  res.json({ result });
});

// app.get("/cate1/:api?", async (req, res) => {
//   const data = [];
//   const [rows] = await db.query("SELECT * FROM categories ORDER BY sid DESC");

//   // 先取得第一層的資料
//   for (let item of rows) {
//     if (+item.parent_sid === 0) {
//       data.push(item);
//     }
//   }

//   // 把第二層的項目放在它所屬的第一層底下
//   for (let a1 of data) {
//     for (let item of rows) {
//       if (+a1.sid === +item.parent_sid) {
//         a1.nodes = a1.nodes || [];
//         a1.nodes.push(item);
//       }
//     }
//   }
//   if (req.params.api === "api") {
//     res.json(data);
//   } else {
//     res.render("cate1", { data });
//   }
// });

// app.get("/cate2", async (req, res) => {
//   const [rows] = await db.query("SELECT * FROM categories ORDER BY sid DESC");

//   // PK 當 key 的物件, 對表用
//   const dict = {};
//   for (let i of rows) {
//     dict[i.sid] = i;
//   }
//   // 上下的關係建立起來
//   for (let i of rows) {
//     // 如果 i 這個項目有上一層
//     if (i.parent_sid) {
//       const parent = dict[i.parent_sid]; // 取得它的上一層
//       parent.nodes ||= [];
//       parent.nodes.push(i);
//     }
//   }

//   const data = [];
//   for (let i of rows) {
//     if (!i.parent_sid) {
//       data.push(i);
//     }
//   }

//   res.json(data);
// });

// 測試收藏
app.get("/like-toggle/:sid", async (req, res) => {
  //const member_sid = 20;  測試時的假資料
  const output = {
    success: false,
    action: "",
    info: "",
  };

  const sid = +req.params.sid || 0;
  if (!sid) {
    output.info = "錯誤的店家編號";
    return res.json(output);
  }

  // 先判斷有沒有該項商品
  const s_sql = `SELECT sid FROM store_escape WHERE sid=?`;
  const [s_rows] = await db.query(s_sql, [sid]);
  if (!s_rows.length) {
    output.info = "沒有該店家";
    return res.json(output);
  }

  const member_sid = res.locals.jwt?.id || 12; // 如果未登入(測試時的假資料)

  const sql = `SELECT * FROM store_likes WHERE store_sid=? AND member_sid=?`;
  const [rows] = await db.query(sql, [sid, member_sid]);

  if (rows.length) {
    // 移除
    output.action = "remove";
    const [result] = await db.query(
      `DELETE FROM store_likes WHERE sid=${rows[0].sid}`
    );
    output.success = !!result.affectedRows;
  } else {
    // 加入
    output.action = "add";
    const sql = `INSERT INTO store_likes (store_sid, member_sid) VALUES (?, ?) `;
    const [result] = await db.query(sql, [sid, member_sid]);
    output.success = !!result.affectedRows;
  }
  res.json(output);
});


// store_escape 的收藏
app.get("/like-toggle-jwt/:sid", async (req, res) => {
  const output = {
    success: false,
    action: "",
    info: "",
  };
  // 如果沒有登入
  if (!res.locals.jwt?.id) {
    output.info = "沒有登入";
    return res.json(output);
  }
  const member_id = res.locals.jwt.id; // 會員的 primary key

  const sid = +req.params.sid || 0;
  if (!sid) {
    output.info = "錯誤的店家編號";
    return res.json(output);
  }

  // 先判斷有沒有該項店家
  const s_sql = `SELECT sid FROM store_escape WHERE sid=?`;
  const [s_rows] = await db.query(s_sql, [sid]);
  if (!s_rows.length) {
    output.info = "沒有該店家";
    return res.json(output);
  }

  const sql = `SELECT * FROM store_likes WHERE store_sid=? AND member_sid=?`;
  const [rows] = await db.query(sql, [sid, member_id]);

  if (rows.length) {
    // 移除
    output.action = "remove";
    const [result] = await db.query(
      `DELETE FROM store_likes WHERE sid=${rows[0].sid}`
    );
    output.success = !!result.affectedRows;
  } else {
    // 加入
    output.action = "add";
    const sql = `INSERT INTO store_likes (store_sid, member_sid) VALUES (?, ?) `;
    const [result] = await db.query(sql, [sid, member_id]);
    output.success = !!result.affectedRows;
  }
  res.json(output);
});

// 收藏店家
app.get("/like-toggle-jwt/:pid", async (req, res) => {
  const output = {
    success: false,
    action: "",
    info: "",
  };
  // 如果沒有登入
  if (!res.locals.jwt?.id) {
    output.info = "沒有登入";
    return res.json(output);
  }
  const member_sid = res.locals.jwt.id; // 會員的 primary key

  const pid = +req.params.pid || 0;
  if (!pid) {
    output.info = "錯誤的商品編號";
    return res.json(output);
  }

  // 先判斷有沒有該項商品
  const p_sql = `SELECT sid FROM member WHERE id=?`;
  const [p_rows] = await db.query(p_sql, [pid]);
  if (!p_rows.length) {
    output.info = "沒有該商品";
    return res.json(output);
  }

  const sql = `SELECT * FROM product_likes WHERE product_id=? AND member_id=?`;
  const [rows] = await db.query(sql, [pid, member_sid]);

  if (rows.length) {
    // 移除
    output.action = "remove";
    const [result] = await db.query(
      `DELETE FROM product_likes WHERE id=${rows[0].sid}`
    );
    output.success = !!result.affectedRows;
  } else {
    // 加入
    output.action = "add";
    const sql = `INSERT INTO product_likes (product_sid, member_id) VALUES (?, ?) `;
    const [result] = await db.query(sql, [pid, member_sid]);
    output.success = !!result.affectedRows;
  }
  res.json(output);
});

app.use("/member", registerRouter);
app.use("/account", editRouter);
app.use("/contact", contactRouter);
app.use("/tr-store", trStoreRouter);
app.use("/reset-password", resetPasswordRouter);
app.use("/order-list", orderListRouter);
app.use("/booking-list", bookingListRouter);


// app.use("/google-login", googleLoginRouter);
// app.use("/upload", uploadRouter);



// *** 路由放在此段之前 ***
// 設定靜態內容的資料夾
app.use(express.static("public"));
app.use("/jquery", express.static("node_modules/jquery/dist"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));

// 404 頁面
// *** 此段放在所有路由設定的後面 ***
app.use((req, res) => {
  res.status(404).send("<h2>是不是走錯路了</h2>");
});

const port = process.env.WEB_PORT || 3002;
app.listen(port, () => {
  console.log(`使用通訊埠: ${port}`);
});