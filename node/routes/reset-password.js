import express from "express";
import transporter from "../config/mail.js";
import "dotenv/config.js";
import db from "./../utils/mysql2-connect.js";
import bcrypt from "bcryptjs";


const router = express.Router();

// 忘記密碼寄信
router.post("/", async (req, res) => {
  
  const { email } = req.body;

  // 檢查郵箱是否存在於資料庫中
  const [user] = await db.query("SELECT * FROM member WHERE email = ?", [
    email,
  ]);
  if (!user.length) {
    return res.status(404).json({ message: "Username not found" });
  }

  // 生成重設密碼的 token
  const ResetToken = bcrypt.hashSync(email + new Date().toISOString(), 10);

  // 更新資料庫中的 token
  await db.query("UPDATE member SET ResetToken = ? WHERE email = ?", [
    ResetToken,
    email,
  ]);

  // // 發送包含重設密碼連結的郵件給用戶
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "jointoplay123@gmail.com",
  //     pass: "zdnfbvdcnshhssfa",
  //   },
  // });

  const mailOptions = {
    from: '"Join-to-play 管理系統" <yehtzuyin08@gmail.com>',
    to: email,
    subject: " 重置密碼指示 Join-to-play 會員帳戶 ",
    html: `

          <div style="font-weight: bold">親愛的會員，您好！</div>
        <br>
        
          <h2 style="font-weight: bold">請點擊以下連結以重置您的密碼：</h2>
          <a style="font-weight: bold" href="http://localhost:3000/member/reset-password?token=${ResetToken}" >
            <h3 font-weight: bold;>點我重設密碼</h3>
          </a>
          <div style="font-weight: bold">
            如果您沒有要求重置密碼，請忽略此郵件。您的密碼將保持不變。
          </div>
          <div style="font-weight: bold">
            如果您有任何疑問或需要幫助，請隨時聯繫我們的客戶支援團隊。謝謝！
            
          </div>
        <br>
          <div style="color:#ED7C15;font-weight: bold;">
            Join-to-play 團隊
          </div>

    `,
  };

  //   transporter.sendMail(mailOptions, (result, info) => {
  //     if (result) {
  //       console.log(error);
  //       return res
  //         .status(500)
  //         .json({ message: "Failed to send reset password email" });
  //     } else {
  //       console.log("Email sent: " + info.response);
  //       return res.status(200).json({ message: "Reset password email sent" });
  //     }
  //   });
  // });

  transporter.sendMail(mailOptions, (result, info) => {
    console.log(result);
    if (result) {
      // console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to send reset password email" });
    } else {
      console.log("Email sent: " + info.response);
      return res
        .status(200)
        .json({ message: "Reset-password email sent success" });
    }
  });
});

// 重置密碼
router.get("/reset-password/:token", (req, res) => {
  const token = req.params.token;
  res.render("reset-password", { token });
});

router.post("/reset-password", async (req, res) => {
  const { password, ResetToken } = req.body;

  try {
    // 驗證 token 的有效性
    // 這裡需要從資料庫中檢查 token 是否有效，以確保它是由你的系統生成的
    // 如果 token 有效，則更新用戶的密碼
    // 假設你的資料庫包含名為 'resetToken' 的欄位用於存儲重設密碼的 token
    // 你可以使用類似的 SQL 查詢來檢查 token 的有效性並更新密碼
    const [user] = await db.query("SELECT * FROM member WHERE ResetToken = ?", [
      ResetToken,
    ]);
    console.log("ResetToken", ResetToken);
    if (user.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // 生成哈希後的新密碼
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 更新用戶的密碼並清除 resetToken
    await db.query(
      "UPDATE member SET password = ?, ResetToken = NULL WHERE ResetToken = ?",
      [hashedPassword, ResetToken]
    );

    // 密碼更新成功，返回成功消息
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default router;
