import express from "express";
import db from "../utils/mysql2-connect.js";

const router = express.Router();

const getListData = async (req, res) => {
  // SELECT * FROM `store_desk` WHERE `name` LIKE '%詩涵%'
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
    sd.\`name\` LIKE ${db.desk(`%${keyword}%`)} 
    OR
    sd.\`mobile\` LIKE ${db.desk(`%${keyword}%`)}
    )
    `;
  }

  let redirect = ""; // 作為轉換依據的變數
  const perPage = 15; // 每頁最多幾筆
  const sql = `SELECT COUNT(1) totalRows FROM store_desk sd ${where}`;
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
    const sql2 = `SELECT * FROM \`store_desk\` 
    
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

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM store_desk";
    const [rows, fields] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
