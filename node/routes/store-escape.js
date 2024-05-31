import express from "express";
import db from "../utils/mysql2-connect.js";

const router = express.Router();

const getListData = async (req, res) => {
  // SELECT * FROM `store_escape` WHERE `name` LIKE '%詩涵%'
  let keyword = req.query.keyword || "";

  // let member_id = 0;  // 預設值為  0
  if (res.locals.jwt && res.locals.jwt.id) {
    // 如果有 JWT 授權
    member_id = res.locals.jwt.id;
  }

  let member_id = 0; // 預設值為  0
  if (res.locals.jwt && res.locals.jwt.id) {
    // 如果有 JWT 授權
    member_id = res.locals.jwt.id;
  }
  let subQuery = `
  (
    SELECT * FROM store_likes WHERE member_id=${member_id}
  ) sl `;

  let where = " WHERE 1 ";
  if (keyword) {
    // 避免 SQL injection
    where += ` AND (
    sd.\`name\` LIKE ${db.escape(`%${keyword}%`)} 
    OR
    sd.\`mobile\` LIKE ${db.escape(`%${keyword}%`)}
    )
    `;
  }

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 12; // 每頁最多幾筆
  const sql = `SELECT COUNT(1) totalRows FROM store_escape sd ${where}`;
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
    const sql2 = `SELECT * FROM \`store_escape\` 
    
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

const getListDataForES3 = async (req, res) => {
  // 查询关键字
  let keyword = req.query.keyword || "";

  // JWT 授权
  let member_id = 0; // 默认值为 0
  if (res.locals.jwt && res.locals.jwt.id) {
    // 如果有 JWT 授权
    member_id = res.locals.jwt.id;
  }

  // WHERE 子句
  let where = " WHERE 1 ";
  if (keyword) {
    // 避免 SQL 注入
    where += ` AND (
    se.\`name\` LIKE ${db.escape(`%${keyword}%`)} 
    OR
    se.\`mobile\` LIKE ${db.escape(`%${keyword}%`)}
    )
    `;
  }

  if (req.query.store_id) {
    // 添加 store_id 条件
    where += ` AND (
    ge.store_id = ${req.query.store_id}
      )
      `;
  }

  // 重定向变量
  let redirect = "";

  // 每页显示数量
  const perPage = 1;

  // 查询总记录数
  const sql = `SELECT COUNT(1) totalRows FROM game ge ${where}`;
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
    // SQL 查询
    const sql2 = `SELECT se.* FROM \`store_escape\` se
    JOIN \`game\` ge ON se.sid = ge.store_id
    ${where} ORDER BY se.sid LIMIT ${(page - 1) * perPage}, ${perPage}`;
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

router.get("/apiForES3", async (req, res) => {
  const data = await getListDataForES3(req, res);
  res.json(data);
});

router.get("/api", async (req, res) => {
  const data = await getListData(req, res);
  res.json(data);
});

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM store_escape";
    const [rows, fields] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
