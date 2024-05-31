import { useRouter } from "next/router";
import { API_SERVER } from "../config";
import { Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

// React-Icon
import { FaStarOfLife } from "react-icons/fa6";
// Style
import styles from "./member.module.css";

export default function ForgetPasswordPage() {
  const router = useRouter();

  const sendMemberEmail = async (e) => {
    e.preventDefault();
    console.log("送出信件結果");
    const email = document.getElementById("email").value; // 從表單中獲取會員帳號

    const response = await fetch(`${API_SERVER}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ email }), // 將會員帳號作為 JSON 對象發送到後端
    });
    const result = await response.json();
    console.log(result);
    if (result) {
      toast.success("請到您的電子信箱收取郵件", {
        style: {
          border: "3px solid #ED7C15",
          // backgroundColor:'#ED7C15',
          padding: "14px",
          color: "black",
        },
        iconTheme: {
          primary: "green",
          secondary: "white",
        },
      });
      router.back();
    } else {
      console.log(result);
      toast.error("無此帳號信箱,請重新輸入", {
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
      <div className="container d-flex p-0 mb-5">
        <section className={`${styles["forget-section"]}`}>
          <div className="col-6">
            <div className={styles["forget-headline"]}>
              <h2>忘記密碼</h2>
              <div style={{ margin: "20px 0px" }}>
                請輸入電子信箱，找回您的密碼
              </div>
              <div className={styles["forget-form"]}>
                <div>
                  <div className="row justify-content-center">
                    <div>
                      <div className="card">
                        <div className={`card-header ${styles["forget-text"]}`}>
                          忘記密碼
                        </div>
                        <div className="card-body">
                          <p
                            className={`text-center mb-3 ${styles["text-note"]}`}
                          >
                            輸入您的會員帳號，按下送出後，我們會將
                            <span
                              style={{
                                color: "red",
                                textDecoration: "underline",
                              }}
                            >
                              &quot;密碼重設指示寄送&quot;
                            </span>{" "}
                            給您。
                          </p>
                          <form>
                            {/* 信箱帳號開始 */}
                            <div
                              className={`form-group row ${styles["forget-box"]}`}
                            >
                              <label
                                htmlFor="count"
                                className={`col-md-4 col-form-label ms-4 ${styles["label-text"]}`}
                              >
                                
                                會員帳號
                                <FaStarOfLife
                                  className={styles["icon-padding"]}
                                />
                              </label>
                              <div className="col-md-6">
                                <input
                                  style={{ borderRadius: "10px" }}
                                  type="email"
                                  id="email"
                                  className={`form-control ${styles['input-mail']}`}
                                  name="email"
                                  placeholder="請輸入信箱"
                                />
                              </div>
                            </div>
                            <Button
                              type="submit"
                              className={styles["forget-btn"]}
                              onClick={sendMemberEmail}
                            >
                              送出
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
      </div>
      <Toaster />
    </>
  );
}
