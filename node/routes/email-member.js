import express from "express";
import transporter from "../config/mail.js";
import dayjs from "dayjs";
import "dotenv/config.js";

const router = express.Router();

router.get("/",function (req,res){
  console.log(123);
})

/* 寄送email的路由 */
router.post("/send/api", function (req, res, next) {
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
  req.body.booking_date =   booking_date; // 置換處理過的值

  let username = req.body.username
  

// email內容
const mailOptions = {
  from: `"JoinToPlay"<yehtzuyin08@gmail.com>`,
  to: "plkjhgfdswa@gmail.com",
  subject: "重設密碼！",
  html: `

  <div style="font-size:1.2rem; color:#333; font-family:Verdana;">
    親愛的${username}您好：<br/>
    請用以下密碼登入之後再重設密碼
  
   

    <br/>
    桌伙來企逃團隊，祝您一切順心:D
  </div>
  `,
};

  // 寄送
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      // 失敗處理
      return res.status(400).json({ status: "error", message: err });
    } else {
      // 成功回覆的json
      return res.json({ status: "success", data: null });
    }
  });
});

export default router;
