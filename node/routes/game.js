import express from "express";
import db from "../utils/mysql2-connect.js";

const router = express.Router();

const getListData = async (req, res) => {
  // SELECT * FROM `game` WHERE `name` LIKE '%詩涵%'
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
    be.\`name\` LIKE ${db.game(`%${keyword}%`)} 
    OR
    be.\`mobile\` LIKE ${db.game(`%${keyword}%`)}
    )
    `;
  }

  if (req.query.store_id) {
    where += ` AND (
    store_id = ${req.query.store_id}
      )
      `;
  }

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 3; // 每頁最多幾筆
  const sql = `SELECT COUNT(1) totalRows FROM game be ${where}`;
  console.log(sql)
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
    const sql2 = `SELECT * FROM \`game\` 
    
    ${where} ORDER BY sid DESC LIMIT ${(page - 1) * perPage
      }, ${perPage}`;
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


const getListDataForES3 = async (req, res) => {
  // SELECT * FROM `game` WHERE `name` LIKE '%詩涵%'
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
    be.\`name\` LIKE ${db.game(`%${keyword}%`)} 
    OR
    be.\`mobile\` LIKE ${db.game(`%${keyword}%`)}
    )
    `;
  }

  if (req.query.sid) {
    where += ` AND (
    sid = ${req.query.sid}
      )
      `;
  }

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 1; // 每頁最多幾筆
  const sql = `SELECT COUNT(1) totalRows FROM game be ${where}`;
  console.log(sql)
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
    const sql2 = `SELECT * FROM \`game\` 
    
    ${where} ORDER BY sid DESC LIMIT ${(page - 1) * perPage
      }, ${perPage}`;
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

router.get("/apiForES3", async (req, res) => {
  const data = await getListDataForES3(req, res);
  res.json(data);
});

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM game";
    const [rows, fields] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
