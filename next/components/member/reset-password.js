import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_SERVER } from "../config";
import { Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

// React-Icon
import { FaStarOfLife } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Style
import styles from "./member.module.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  // 新增token
  const [ResetToken, setResetToken] = useState(null);
  // 呈現密碼用
  const [showPassword, setShowPassword] = useState(false);

  // 獲取 resetPasswordToken
  useEffect(() => {
    const { token } = router.query;
    if (token) {
      setResetToken(token);
    }
  }, [router.query]);

  const changePassword = async (e) => {
    e.preventDefault();
    console.log("按下確定");
    const password = document.getElementById("password").value; // 從表單中獲取會員帳號

    const response = await fetch(
      `${API_SERVER}/reset-password/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ password: password, ResetToken: ResetToken }),
      }
    );
    const res = await response.json();
    console.log(res);
    if (res.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "密碼重新設定成功",
        showConfirmButton: false,
        timer: 2000,
      });
      router.push("/member/login");
    } else {
      toast.error("密碼重新設定失敗", {
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  };

  return (
    <>
      <section className={`mb-5 ${styles["forget-section"]}`}>
        <div className="col-6">
          <div className={styles["forget-headline"]}>
            <h2>會員專區</h2>
            <div style={{ margin: "20px 0px" }}>
              動動你的小指頭，立即重設密碼
            </div>
            <div className={styles["forget-form"]}>
              <div>
                <div className="row justify-content-center">
                  <div>
                    <div className="card">
                      <div className={`card-header ${styles["forget-text"]}`}>
                        重置密碼
                      </div>
                      <div className="card-body">
                        
                        <form>
                          {/* 新密碼 */}
                          <div
                            className={`form-group row ms-4 ${styles["forget-box"]}`}
                          >
                            <label
                              htmlFor="password"
                              className={`col-md-4 col-form-label ${styles["label-verify-text"]}`}
                            >
                              新密碼
                              <FaStarOfLife
                                className={styles["icon-padding"]}
                              />
                            </label>
                            <div
                              className="col-md-6 d-flex mb-3"
                              style={{
                                position: "relative",
                              }}
                            >
                              <input
                                style={{ borderRadius: "10px" }}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className={`form-control ${styles['reset-input']}`}
                                name="password"
                                placeholder="請輸入新密碼"
                              />
                              <button
                                type="button"
                                className={styles["show-password"]}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowPassword(!showPassword);
                                }}
                              >
                                {!showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                          </div>
                          {/* 確認新密碼 */}
                          <div
                            className={`form-group row ms-4 ${styles["forget-box"]}`}
                          >
                            <label
                              htmlFor="confirm_pwd"
                              className={`col-md-4 col-form-label ${styles["label-verify-text"]}`}
                            >
                              確認密碼
                              <FaStarOfLife
                                className={styles["icon-padding"]}
                              />
                            </label>
                            <div className="col-md-6">
                              <input
                                style={{ borderRadius: "10px" }}
                                type="password"
                                className={`form-control ${styles['reset-input']}`}
                                name="confirm_password"
                                placeholder="請輸入確認密碼"
                              />
                            </div>
                          </div>
                          <Button
                            type="submit"
                            className={styles["forget-btn"]}
                            onClick={changePassword}
                          >
                            <span className="glyphicon glyphicon-off" />
                            確認
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
}
