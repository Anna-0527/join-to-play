import React from "react";
import styles from "./member.module.css";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import GoogleLogo from "@/components/icons/google-logo";
import { useRouter } from "next/router";
import { useState } from "react";
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import Login from "./google-login";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    return email.toString().indexOf("@") >= 0; // 粗略的判斷方式
  };
  const validatePassword = (password) => {
    return (
      password.toString().length >= 6 &&
      password.toString().length <= 12 &&
      /[A-Z]/.test(password) &&
      /[^a-zA-Z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  const emailBlur = () => {
    if (!validateEmail(email)) {
      setErrorMsg({ ...errorMsg, email: "請輸入正確的 Email" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, email: "" });
      return true;
    }
  };

  const passwordBlur = () => {
    if (!validatePassword(password)) {
      setErrorMsg({ ...errorMsg, password: "請輸入含英文大小寫 6-12 碼" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, password: "" });
      return true;
    }
  };

  const [isPass, setIsPass] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const tmpIsPass = emailBlur() && passwordBlur();
    setIsPass(tmpIsPass);

    console.log({ email, password });
    login(email, password).then((result) => {
      if (result) {
        alert("登入成功");
        router.push("/member");
      } else {
        alert("登入失敗");
      }
    });
  };

  // 一鍵輸入功能
  const fillFormWithDemoData = () => {
    setEmail("wangxiaoming@example.com");
    setPassword("Aa12345");
  };

  return (
    <div className={`${styles["LoginForm"]}  text-center `}>
      <h2 className="text-center mb-3">會員登入</h2>
      <form onSubmit={onSubmit} id={`${styles["login_form_menu"]}`}>
        <div className={`${styles["member-form-area"]}`}>
          <div className={`${styles["FormGroup"]}`}>
            <label htmlFor="login_account_menu">Email</label>
            <div>
              <input
                type="text"
                name="email"
                id="login_account_menu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={emailBlur}
                placeholder="輸入您的E-mail"
                className={`form-control ${styles["FormInput"]}`}
                style={errorMsg.email ? redBorder : {}}
              />
              <div className="form-text" style={redText}>
                {errorMsg.email}
              </div>
            </div>
          </div>
          <div className={`${styles["FormGroup"]}`}>
            <label htmlFor="login_pwd_menu">密 碼</label>
            <div>
              <input
                type="password"
                className={`form-control ${styles["FormInput"]}`}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={passwordBlur}
                style={errorMsg.password ? redBorder : {}}
                placeholder="輸入您的密碼"
              />
              <div className="form-text" style={redText}>
                {errorMsg.password}
              </div>
            </div>
          </div>
          <div className={`d-flex ${styles["FormCheck"]}`}>
            <input type="checkbox" />
            記住我
            <Link
              className={`${styles["forgot"]}`}
              id="ForgotPwd"
              href="/member/forget-password"
              aria-label="忘記密碼"
            >
              忘記密碼?
            </Link>
          </div>
        </div>
        <button
          className={`${styles["login-is-on"]}`}
          id="btn_member_login_menu"
        >
          登 入
        </button>
        <button
          onClick={fillFormWithDemoData}
          type="button"
          className={`${styles["autoInput"]}`}
        >
          一鍵輸入
        </button>
        
        {/* <div className={`text-center mt-3 ${styles["hr-sect"]}`}>快速登入</div> */}
      </form>
      <button className={`${styles["JoinBtn"]}`}>
          <Link
            className={`${styles["JoinBtn-link"]}`}
            href="/member/register"
            aria-label="加入會員"
          >
            加入會員
          </Link>
        </button>
      <div className="row mb-2">
        <div className="col-sm-12 text-start">
          <div className="d-flex justify-content-center">
            {/* <Login className="mx-3" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
