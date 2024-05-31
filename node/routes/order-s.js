import express from "express";
import db from "../utils/mysql2-connect.js"

const router = express.Router();

router.get("/api", async (req, res) => {
  /* const data = await getListData(req, res);
  res.json(data); */
  console.log('test order-s');
});

// router.get("/", async (req, res) => {
// try {
//     const sql = "SELECT * FROM orders";
//     const [rows, fields] = await db.query(sql);
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   } 
// });



// 解析HTTP請求主體
router.use(express.json());

// 處理POST請求以處理訂單資料
router.post('/', async (req, res) => {
  const orderData = req.body;
  console.log('Received orderData:', orderData); // 在後端日誌中輸出 orderData
const member_id=1

  try {
    // 1. 插入訂單資訊到 orders 資料表中
    const insertOrderQuery = 'INSERT INTO orders (total_price, customer, member_id, phone, address, delivery_method, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [insertOrderResult] = await db.query(insertOrderQuery, [orderData.total_price, orderData.customer, member_id, orderData.phone, orderData.address, orderData.deliveryMethod, orderData.paymentMethod]);
    const orderId = insertOrderResult.insertId; // 獲取剛插入的訂單的 ID
    console.log('111 orderId'+orderId);
    


    // 2. 插入訂單詳細資訊到 order_details 資料表中
    const insertOrderDetailQuery = 'INSERT INTO order_detail (order_id, product_id, qty, price, product_name) VALUES (?, ?, ?, ?, ?)';

    for (const product of orderData.products) {
      // 使用迴圈中的 product 物件中的屬性來插入到資料庫中
      await db.query(insertOrderDetailQuery, [
        orderId,
        product.id, // 產品的 ID
        product.qty, // 產品的數量
        product.price, // 產品的價格
        product.name // 產品的名稱
      ]);
    }
    
    console.log('訂單資訊及詳細資訊插入成功');
    res.status(200).send('訂單資訊及詳細資訊插入成功');
  } catch (error) {
    console.error('插入訂單資訊及詳細資訊時出錯:', error);
    res.status(500).send('插入訂單資訊及詳細資訊時出錯');
  }
  console.log('test111');
});

  
  



export default router;
