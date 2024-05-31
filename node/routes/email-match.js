import express from "express";
import transporter from "../config/mail.js";
import dayjs from "dayjs";
import "dotenv/config.js";

const router = express.Router();

// 紀錄更新status狀態
const updateStatusData = `
UPDATE match_desk
SET md_status = 1 ,updated_at = CURRENT_TIMESTAMP	
WHERE md_id = ?
`;

/* 寄送email的路由 */
router.post("/send/api", async function (req, res, next) {
  const output = {
    success: false,
    postData: req.body,
    error: "",
    code: 0,
  };
  let booking_date = dayjs(req.body.booking_date, "YYYY-MM-DD", true);

  booking_date = booking_date.isValid()
    ? booking_date.format("YYYY-MM-DD")
    : null;
  req.body.booking_date = booking_date; // 置換處理過的值

  let match_name = req.body.match_name;
  let store_name = req.body.store_name;
  let booking_time = req.body.booking_time;
  let store_address = req.body.store_address;
  let md_id = req.body.md_id;

  // email內容
  const mailOptions = {
    from: `"JoinToPlay"<yehtzuyin08@gmail.com>`,
    to: "yvonne1998527@gmail.com",
    subject: "恭喜揪團成功！",
    html: `

  <div style="font-size:1.2rem; color:#333; font-family:Verdana;">
    親愛的玩家您好：<br/>
    您的揪團 <b>${match_name}</b> 已成功預約，請記得攜帶身分證明文件準時到場報到。
  
   <p><b>時間: ${booking_date} ${booking_time}</b></p>
   <p><b>店名: ${store_name}</b></p>
   <p><b>地址: ${store_address}</b></p>

    <br/>
    桌伙來企逃團隊，祝您一切順心:D
  </div>
  `,
  };

  // 更新 match_desk中的 status
  try {
    const [result] = await db.query(updateStatusData, [md_id]);
    output.success = !!result.affectedRows;
  } catch (ex) {
    output.error = ex.toString();
  }

  // 寄送
  await transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      // 失敗處理
      return res.status(400).json({ status: "error", message: err });
    } else {
      // 成功回覆的json
      return res.json({ status: "success", data: null });
    }
  });

  // 更新status
});

export default router;
