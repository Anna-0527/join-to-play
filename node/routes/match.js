import express from "express";
import db from "../utils/mysql2-connect.js";
import upload from "../utils/upload-imgs.js";
import dayjs from "dayjs";
import { z } from "zod";
const router = express.Router();

const member_id = 1;

// 紀錄更新current_count的sql
const uploadCurrentCount = `
UPDATE match_desk AS md
JOIN (
    SELECT match_desk_id, COUNT(*) AS current_count
    FROM match_desk_member 
    GROUP BY match_desk_id
) AS mm ON md.md_id = mm.match_desk_id
SET md.current_count = mm.current_count;`;

// 紀錄更新confirmed狀態
const updateConfirmedData = `
UPDATE match_desk
SET confirmed = 1 ,updated_at = CURRENT_TIMESTAMP	
WHERE current_count = player_count
`;

const getListData = async (req) => {
  // SELECT * FROM `address_book` WHERE `name` LIKE '%詩涵%'
  let keyword = req.query.keyword || "";
  let area = req.query.area || "";

  let date_begin = req.query.date_begin || null;
  if (date_begin) {
    // 日期的格式檢查
    date_begin = dayjs(date_begin, "YYYY-MM-DD", true); // dayjs 物件
    // 如果是合法的日期格式, 就轉換為日期的字串, 否則設定為空值
    date_begin = date_begin.isValid() ? date_begin.format("YYYY-MM-DD") : null;
  }
  let date_end = req.query.date_end || null;
  if (date_end) {
    date_end = dayjs(date_end, "YYYY-MM-DD", true); // dayjs 物件
    // 如果是合法的日期格式, 就轉換為日期的字串, 否則設定為空值
    date_end = date_end.isValid() ? date_end.format("YYYY-MM-DD") : null;
  }
  let where = " WHERE 1 ";

  // 根據地區篩選店家資料的 SQL 查詢
  switch (area) {
    case "1": // 北部
      where += `
      AND (
        store_address LIKE '%宜蘭%' OR
        store_address LIKE '%台北%' OR
        store_address LIKE '%臺北%' OR
        store_address LIKE '%新北%' OR
        store_address LIKE '%基隆%' OR
        store_address LIKE '%新竹%' OR
        store_address LIKE '%桃園%'
      )`;
      break;
    case "2": // 中部
      where += `
      AND (
        store_address LIKE '%臺中%' OR
        store_address LIKE '%台中%' OR
        store_address LIKE '%彰化%' OR
        store_address LIKE '%南投%' OR
        store_address LIKE '%苗栗%'
      )`;
      break;
    case "3": // 南部
      where += `
      AND (
        store_address LIKE '%臺南%' OR
        store_address LIKE '台南%' OR
        store_address LIKE '高雄%' OR
        store_address LIKE '%嘉義%' OR
        store_address LIKE '%屏東%'
      )`;
      break;
    case "4": // 東部
      where += `
      AND (
        store_address LIKE '%台東%' OR
        store_address LIKE '%臺東%' OR
        store_address LIKE '%花蓮%'
      )`;
      break;
    case "5": // 離島
      where += `
      AND (
        store_address LIKE '%金門%' OR
        store_address LIKE '%澎湖%' OR
        store_address LIKE '%連江%'
      )`;
      break;
    default:
      break;
  }

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 6; // 每頁最多幾筆
  const sqlMatchDesk = `SELECT COUNT(1) totalRows FROM match_desk 
  JOIN store_desk ON store_desk.sid =store_id
  ${where}`;
  let page = +req.query.page || 1;
  if (page < 1) {
    redirect = "?page=1";
    return { success: false, redirect };
  }
  // 多層的展開, totalRows 總筆數
  const [[{ totalRows }]] = await db.query(sqlMatchDesk);
  const totalPages = Math.ceil(totalRows / perPage); // 總頁數

  // 目前人數

  let rows = [];
  if (totalRows > 0) {
    if (page > totalPages) {
      redirect = `?page=${totalPages}`;
      return { success: false, redirect };
    }

    const sqlMatchDesk2 = `
    SELECT *
    FROM match_desk desk1
    JOIN store_desk ON store_id =store_desk.sid
    ${where} 
    ORDER BY desk1.md_id DESC
    LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sqlMatchDesk2);
  }

  rows.forEach((item) => {
    // 把 booking_date 欄位的值轉換成 "YYYY-MM-DD" 格式的字串
    const d = dayjs(item.booking_date);
    item.booking_date = d.isValid() ? d.format("YYYY-MM-DD") : "";
  });

  ////////////////////////////////////////////////////////////

  //TODO 引入逃脫資料表 ##等待更改

  ////////////////////////////////////////////////////////////
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

// 桌遊店家資料
const getDeskStoreData = async (req) => {
  let deskRows = [];
  let formArea = req.query.formArea || "";
  let where = " WHERE 1 ";

  // 根據地區篩選店家資料的 SQL 查詢
  switch (formArea) {
    case "1": // 北部
      where += `
      AND (
        store_address LIKE '%宜蘭%' OR
        store_address LIKE '%台北%' OR
        store_address LIKE '%臺北%' OR
        store_address LIKE '%新北%' OR
        store_address LIKE '%基隆%' OR
        store_address LIKE '%新竹%' OR
        store_address LIKE '%桃園%'
      )`;
      break;
    case "2": // 中部
      where += `
      AND (
        store_address LIKE '%臺中%' OR
        store_address LIKE '%台中%' OR
        store_address LIKE '%彰化%' OR
        store_address LIKE '%南投%' OR
        store_address LIKE '%苗栗%'
      )`;
      break;
    case "3": // 南部
      where += `
      AND (
        store_address LIKE '%臺南%' OR
        store_address LIKE '台南%' OR
        store_address LIKE '高雄%' OR
        store_address LIKE '%嘉義%' OR
        store_address LIKE '%屏東%'
      )`;
      break;
    case "4": // 東部
      where += `
      AND (
        store_address LIKE '%台東%' OR
        store_address LIKE '%臺東%' OR
        store_address LIKE '%花蓮%'
      )`;
      break;
    case "5": // 離島
      where += `
      AND (
        store_address LIKE '%金門%' OR
        store_address LIKE '%澎湖%' OR
        store_address LIKE '%連江%'
      )`;
      break;
    default:
      break;
  }

  const sqlStoreDesk = `SELECT sid store_id, store_name, store_address FROM store_desk ${where}`;
  [deskRows] = await db.query(sqlStoreDesk);

  return {
    deskRows,
    formArea,
    qs: req.query,
  };
};

const getMyListData = async (req) => {
  // SELECT * FROM `address_book` WHERE `name` LIKE '%詩涵%'
  let keyword = req.query.keyword || "";
  let date_begin = req.query.date_begin || null;
  if (date_begin) {
    // 日期的格式檢查
    date_begin = dayjs(date_begin, "YYYY-MM-DD", true); // dayjs 物件
    // 如果是合法的日期格式, 就轉換為日期的字串, 否則設定為空值
    date_begin = date_begin.isValid() ? date_begin.format("YYYY-MM-DD") : null;
  }
  let date_end = req.query.date_end || null;
  if (date_end) {
    date_end = dayjs(date_end, "YYYY-MM-DD", true); // dayjs 物件
    // 如果是合法的日期格式, 就轉換為日期的字串, 否則設定為空值
    date_end = date_end.isValid() ? date_end.format("YYYY-MM-DD") : null;
  }
  let where = " WHERE 1 ";

  /*
  如果用戶有設定篩選booking_date的起始日期
  if (date_begin) {
    where += ` AND  \`booking_date\` >= ${db.escape(date_begin)} `;
  }
  如果用戶有設定篩選booking_date的結束日期
  if (date_end) {
    where += ` AND  \`booking_date\` <= '${date_end}' `;
  }
*/

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 6; // 每頁最多幾筆
  const sqlMatchDesk = `
  SELECT COUNT(1) totalRows FROM match_desk_member WHERE member_id=${member_id}`;
  let page = +req.query.page || 1;
  if (page < 1) {
    redirect = "?page=1";
    return { success: false, redirect };
  }
  // 多層的展開, totalRows 總筆數
  const [[{ totalRows }]] = await db.query(sqlMatchDesk);
  const totalPages = Math.ceil(totalRows / perPage); // 總頁數

  let rows = [];
  if (totalRows > 0) {
    if (page > totalPages) {
      redirect = `?page=${totalPages}`;
      return { success: false, redirect };
    }

    const sqlMatchDesk2 = `
    SELECT md_id,match_name,booking_date,booking_time,current_count,player_count
    FROM match_desk
    JOIN 
    (SELECT * FROM match_desk_member WHERE member_id=${member_id}) member
    ON md_id = match_desk_id
    ORDER BY match_desk.created_at DESC
    LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sqlMatchDesk2);
  }

  rows.forEach((item) => {
    // 把 booking_date 欄位的值轉換成 "YYYY-MM-DD" 格式的字串
    const d = dayjs(item.booking_date);
    item.booking_date = d.isValid() ? d.format("YYYY-MM-DD") : "";
  });

  return {
    success: true,
    totalRows,
    perPage,
    totalPages,
    rows,
    page,
    keyword,
    qs: req.query,
    // member_id,
  };
};

const getAlmostDeskData = async (req) => {
  // SELECT * FROM `address_book` WHERE `name` LIKE '%詩涵%'
  let keyword = req.query.keyword || "";
  let date_begin = req.query.date_begin || null;
  if (date_begin) {
    // 日期的格式檢查
    date_begin = dayjs(date_begin, "YYYY-MM-DD", true); // dayjs 物件
    // 如果是合法的日期格式, 就轉換為日期的字串, 否則設定為空值
    date_begin = date_begin.isValid() ? date_begin.format("YYYY-MM-DD") : null;
  }
  let date_end = req.query.date_end || null;
  if (date_end) {
    date_end = dayjs(date_end, "YYYY-MM-DD", true); // dayjs 物件
    // 如果是合法的日期格式, 就轉換為日期的字串, 否則設定為空值
    date_end = date_end.isValid() ? date_end.format("YYYY-MM-DD") : null;
  }
  let where = " WHERE 1 ";

  /*
  如果用戶有設定篩選booking_date的起始日期
  if (date_begin) {
    where += ` AND  \`booking_date\` >= ${db.escape(date_begin)} `;
  }
  如果用戶有設定篩選booking_date的結束日期
  if (date_end) {
    where += ` AND  \`booking_date\` <= '${date_end}' `;
  }
*/

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 6; // 每頁最多幾筆
  const sqlMatchDesk = `
  SELECT COUNT(1) totalRows FROM match_desk WHERE (player_count - current_count)<=2`;
  let page = +req.query.page || 1;
  if (page < 1) {
    redirect = "?page=1";
    return { success: false, redirect };
  }
  // 多層的展開, totalRows 總筆數
  const [[{ totalRows }]] = await db.query(sqlMatchDesk);
  const totalPages = Math.ceil(totalRows / perPage); // 總頁數

  let rows = [];
  if (totalRows > 0) {
    if (page > totalPages) {
      redirect = `?page=${totalPages}`;
      return { success: false, redirect };
    }

    const sqlMatchDesk2 = `
    SELECT md_id,match_name,booking_date,booking_time,current_count,player_count,store_address
    FROM match_desk
    JOIN store_desk
    ON store_desk.sid = store_id
    WHERE (player_count - current_count) BETWEEN 1 AND 3
    ORDER BY (player_count - current_count)
    LIMIT ${(page - 1) * perPage}, ${perPage}`;
    [rows] = await db.query(sqlMatchDesk2);
  }

  rows.forEach((item) => {
    // 把 booking_date 欄位的值轉換成 "YYYY-MM-DD" 格式的字串
    const d = dayjs(item.booking_date);
    item.booking_date = d.isValid() ? d.format("YYYY-MM-DD") : "";
  });

  return {
    success: true,
    totalRows,
    perPage,
    totalPages,
    rows,
    page,
    keyword,
    qs: req.query,
    // member_id,
  };
};

/*
router.use((req, res, next)=>{
  if(! req.session.admin){
    return res.status(403).send("<h1>無權訪問這頁面</h1>");
  }
  next();
});
*/
router.get("/", async (req, res) => {
  res.locals.pageName = "match_list";
  res.locals.title = "快速媒合 — " + res.locals.title;

  const [listData, storeDeskData] = await Promise.all([
    getListData(req),
    getDeskStoreData(req),
  ]);

  if (listData.redirect) {
    return res.redirect(listData.redirect);
  }
  const data = { ...listData, ...storeDeskData }; //合併

  res.render("/match", data);
});

router.get("/api", async (req, res) => {
  const [listData, storeDeskData] = await Promise.all([
    getListData(req),
    getDeskStoreData(req),
  ]);

  const data = { ...listData, ...storeDeskData }; //合併

  res.json(data);
});

// 我的揪團
router.get("/my-match/api", async (req, res) => {
  res.locals.pageName = "my-match";
  res.locals.title = "我的揪團 — " + res.locals.title;

  const myListData = await getMyListData(req, res);
  res.json(myListData);

  // if (myListData.redirect) {
  //   return res.redirect(myListData.redirect);
  // }

  /*
  if (req.session.admin) {
    res.render("my-match/list", myListData);
  } else {
    // res.render("address-book/list-no-admin", myListData);
    res.render("my-match/list", myListData);
  }
  */
});

router.get("/desk/almost/api", async (req, res) => {
  const almostDeskData = await getAlmostDeskData(req, res);
  res.json(almostDeskData);
});

router.delete("/:md_id", async (req, res) => {
  const md_id = +req.params.md_id || 0;
  if (md_id === 0) {
    return res.json({
      success: false,
      info: "無效的參數",
    });
  }
  const sqlMatchDesk = `DELETE FROM match_desk WHERE md_id=?`;
  const [result] = await db.query(sqlMatchDesk, [id]);
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
router.get("/desk/add", async (req, res) => {
  res.locals.pageName = "desk_match_add";
  res.locals.title = "創建新團 — " + res.locals.title;
  res.render("/desk/add");
});
// 處理新增資料的表單
router.post("/desk/add", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };
  // TODO: 資料格式檢查
  const formSchema = z.object({
    match_name: z.string().min(2, { message: "揪團名稱長度要大於等於 2" }),
    // email: z.string().email({message: "請填寫正確的 email"}),
    // mobile: z.string().regex(/^09\d{2}-?\d{3}-?\d{3}$/, {message: "請填寫正確的手機號碼"})
  });
  const parseResult = formSchema.safeParse(req.body);
  if (!parseResult.success) {
    output.issues = parseResult.error.issues;
    return res.json(output);
  }
  let booking_date = dayjs(req.body.booking_date, "YYYY-MM-DD", true); // dayjs 物件
  booking_date = booking_date.isValid()
    ? booking_date.format("YYYY-MM-DD")
    : null;
  req.body.booking_date = booking_date; // 置換處理過的值
  /*
  const sql = "INSERT INTO `address_book`(`name`, `email`, `mobile`, `birthday`, `address`, `created_at`) VALUES (?, ?, ?, ?, ?, NOW())";
  const [result] = await db.query(sql, [
    req.body.name,
    req.body.email,
    req.body.mobile,
    req.body.birthday,
    req.body.address,
  ]);
  */
  const sqlMatchDesk2 = "INSERT INTO `match_desk` SET ? ";
  req.body.created_at = new Date(); // 新增屬性 created_at (欄位名稱)
  let result;
  let newMatchDeskId;
  try {
    [result] = await db.query(sqlMatchDesk2, [req.body]);
    newMatchDeskId = result.insertId;
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

  // 新增一張 媒合成員表
  const sqlMatchDeskMember = "INSERT INTO match_desk_member SET ?";
  const deskMemberData = {
    match_desk_id: newMatchDeskId, // 使用插入的 primary key
    member_id: member_id,
    created_at: req.body.created_at,
  };
  try {
    [result] = await db.query(sqlMatchDeskMember, [deskMemberData]);
    output.success = !!result.affectedRows;
  } catch (ex) {
    output.error = ex.toString();
  }

  // 更新 全部 桌遊媒合 match_desk 的 current_count
  try {
    [result] = await db.query(uploadCurrentCount);
    output.success = !!result.affectedRows;
  } catch (ex) {
    output.error = ex.toString();
  }

  res.json(output);
});

// match-desk-member  加入揪團成為新成員
// ## 等待更新 JWT 取得會員id
// ## 判斷滿人情況
router.post("/desk/detail/add-in/:md_id", async (req, res) => {
  /*
  // 如果沒有登入
  if(! res.locals.jwt?.id) {
    output.info = "沒有登入";
    return res.json(output);
  }
  const member_id = res.locals.jwt.id; // 會員的 primary key
*/
  // const member_id = 9 // 測試用
  const output = {
    success: false,
    action: "",
    info: "",
  };
  const md_id = +req.params.md_id || 0;
  if (!md_id) {
    output.info = "錯誤的揪團編號";
    return res.json(output);
  }

  // 先判斷有沒有該揪團 以及 揪團成員資料 ( match_desk match_desk_member )
  const md_sql = `SELECT md_id FROM match_desk WHERE md_id=?`;
  const [md_rows] = await db.query(md_sql, [md_id]);
  if (!md_rows.length) {
    output.info = "沒有這個揪團 囧";
    return res.json(output);
  }
  const count_sql = `
  SELECT md_id FROM match_desk
  WHERE current_count = player_count
  AND md_id = ?
  `;
  const [count_rows] = await db.query(count_sql, md_id);
  if (count_rows.length) {
    output.info = "人數已滿";
    return res.json(output);
  }

  const sql = `SELECT * FROM match_desk_member WHERE match_desk_id=? AND member_id=?`;
  const [rows] = await db.query(sql, [md_id, member_id]);

  if (rows.length) {
    /*
    // 移除
    output.action = "remove";
    const [result] = await db.query(
      `DELETE FROM product_likes WHERE sid=${rows[0].sid}`
    );
    output.success = !!result.affectedRows;
    */
    output.info = "您已經在這個揪團之中";
  } else {
    // 加入
    output.action = "add";
    const sql = `INSERT INTO match_desk_member (match_desk_id, member_id) VALUES (?, ?) `;
    const [result] = await db.query(sql, [md_id, member_id]);
    output.success = !!result.affectedRows;
  }
  try {
    [result] = await db.query(uploadCurrentCount);
    output.success = !!result.affectedRows;
  } catch (ex) {
    output.error = ex.toString();
  }

  try {
    [result] = await db.query(updateConfirmedData);
    output.success = !!result.affectedRows;
  } catch (ex) {
    output.error = ex.toString();
  }

  res.json(output);
});

// 要處理 multipart/form-data
router.post("/add/multi", upload.none(), async (req, res) => {
  res.json(req.body);
});

// 修改資料的表單
router.get("/desk/edit/:md_id", async (req, res) => {
  const md_id = +req.params.md_id || 0;
  if (!md_id) {
    return res.redirect("/desk/detail");
  }
  // 把＊改成需要的欄位
  const sqlMatchDesk = `
  SELECT md_id,match_name,store_id,store_name,booking_date,booking_time,player_count,special_request
  FROM match_desk
  JOIN store_desk ON store_id =store_desk.sid
  WHERE md_id=${md_id}`;

  const [rows] = await db.query(sqlMatchDesk);
  if (!rows.length) {
    return res.redirect("/desk");
  }
  const r = rows[0];
  const d = dayjs(r.booking_date);
  r.booking_date = d.isValid() ? d.format("YYYY-MM-DD") : "";
  res.render("/desk/edit", r);
});
router.put("/desk/edit/:md_id", async (req, res) => {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };
  let md_id = +req.params.md_id || 0;
  let booking_date = dayjs(req.body.booking_date, "YYYY-MM-DD", true); // dayjs 物件
  // 置換處理過的值
  req.body.booking_date = booking_date.isValid()
    ? booking_date.format("YYYY-MM-DD")
    : null;
  // TODO: 資料格式檢查
  const sqlMatchDesk = "UPDATE `match_desk` SET ? WHERE md_id=?";

  try {
    // 執行 SQL 時最好做錯誤處理
    const [result] = await db.query(sqlMatchDesk, [req.body, md_id]);
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

// 取得單筆桌遊detail資料的 API
router.get("/desk/detail/:md_id", async (req, res) => {
  const md_id = +req.params.md_id || 0;
  if (!md_id) {
    return res.json({ success: false });
  }
  const sql = `SELECT *
  FROM match_desk desk1
  JOIN store_desk ON store_id =store_desk.sid
  JOIN match_desk_member ON match_desk_id = desk1.md_id
  JOIN member ON member.id = match_desk_member.member_id
  WHERE desk1.md_id=?
  ORDER BY match_desk_member.created_at `;
  const [rows] = await db.query(sql, [md_id]);
  console.log(rows);

  if (!rows.length) {
    return res.json({ success: false });
  }

  const nicknames = rows.map((row) => row.nickname);

  const r = rows[0];

  const data = {
    ...r,
    nicknames: nicknames.slice(1),
    // 去掉第一筆資料
  };

  const d = dayjs(r.booking_date);
  data.booking_date = d.isValid() ? d.format("YYYY-MM-DD") : "";

  res.json({ success: true, data: data });
});

export default router;

///////////////
