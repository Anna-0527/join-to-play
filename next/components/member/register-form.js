import React, { useState } from "react";
import { MEMBER_ADD_POST } from "@/components/config";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./member.module.css";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    nickname: "",
    birthday: "",
    address: "",
    password: "",
    password2: "",
    gender: "",
    tag_id: "",
    // agree: false, // 勾選盒(checkbox)的checked屬性用的
  });

  // 記錄錯誤的物件
  const [errorMsg, setErrorMsg] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
    // agree: "", // 記錄錯誤訊息用
  });

  // 整個表單有沒有通過檢查
  const [isPass, setIsPass] = useState(false);

  const validateName = (username) => {
    return username.toString().length >= 2;
  };
  const validateEmail = (email) => {
    return email.toString().indexOf("@") >= 0; // 粗略的判斷方式
  };
  const validateMobile = (mobile) => {
    return /^09\d{2}-?\d{3}-?\d{3}$/.test(mobile);
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
  const validatePassword2 = (password2) => {
    return password2 === formData.password;
};

  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const nameBlur = () => {
    if (!validateName(formData.username)) {
      setErrorMsg({ ...errorMsg, username: "請輸入正確的姓名" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, username: "" });
      return true;
    }
  };
  const passwordBlur = () => {
    if (!validatePassword(formData.password)) {
      setErrorMsg({ ...errorMsg, password: "請輸入含英文大小寫 6-12 碼" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, password: "" });
      return true;
    }
  };
  const password2Blur = () => {
    if (!validatePassword2(formData.password2)) {
      setErrorMsg({ ...errorMsg, password2: "請輸入相同密碼" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, password2: "" });
      return true;
    }
  };
  const emailBlur = () => {
    if (!validateEmail(formData.email)) {
      setErrorMsg({ ...errorMsg, email: "請輸入正確的 Email" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, email: "" });
      return true;
    }
  };
  const mobileBlur = () => {
    if (!validateMobile(formData.mobile)) {
      setErrorMsg({ ...errorMsg, mobile: "請輸入正確的手機號碼" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, mobile: "" });
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 表單不要以傳統方式送出

    // 本來是做事件處理器
    // 若nameBlur() && emailBlur() && mobileBlur()為 true,則tmpIsPass 為 true

    // TODO 後端需再寫入接收陣列的程式
    // tag_id 多選做法
    // const fd = new FormData(e.target);
    // const tag_ids = fd.getAll("tag_id");
    // console.log(tag_ids);

    const tmpIsPass = nameBlur() && emailBlur() && mobileBlur() && passwordBlur() && password2Blur();
    setIsPass(tmpIsPass);

    if (tmpIsPass) {
      //console.log("表單送出");
      const r = await fetch(MEMBER_ADD_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await r.json();

      // console.log(result);
      if (result.success) {
        alert("註冊成功 請重新登入");

        // 註冊後跳回首頁
        router.push("/member/login");
      } else {
        alert("資料沒有新增");
      }
    } else {
      alert("必填欄位請填入符合格式的值");
    }
  };

  const fillFormWithDemoData = () => {
    setFormData({
      ...formData,
      email: "yusau721@gmail.com",
      password: "Aa12345",
      password2: "Aa12345",
      username: "章魚燒",
      mobile: "0911223344",
      address: "高雄市",
    });
  };

  // console.log(formData);

  

  return (
    <>
      <div className={`container p-3 ${styles["join_form"]}`}>
        <div>
          <h2 className={`ms-3 mb-5 ${styles["join_form-title"]}`}>註冊會員</h2>
        </div>
        <div className={`${styles["register-content"]}`}>
          <form onSubmit={onSubmit} className={`${styles["register-form"]}`}>
            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="inputEmail"
                className={`col-form-label required ${styles["register-label-group"]}`}
              >
                Email
              </label>
              <div className={`${styles["register-input-group"]}`}>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={fieldChanged}
                  onBlur={emailBlur}
                  style={errorMsg.email ? redBorder : {}}
                  autoComplete="email" // 添加 autocomplete 屬性
                />
                <div className="form-text" style={redText}>
                  {errorMsg.email}
                </div>
              </div>
            </div>
            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="inputPassword"
                className={`col-form-label required ${styles["register-label-group"]}`}
              >
                密碼
              </label>
              <div className={` ${styles["register-input-group"]}`}>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={fieldChanged}
                  onBlur={passwordBlur}
                  placeholder="6-12碼，英文+數字，大小寫不同"
                  style={errorMsg.password ? redBorder : {}}
                  autoComplete="new-password" // 添加 autocomplete 屬性
                />
                <div className="form-text" style={redText}>
                  {errorMsg.password}
                </div>
              </div>
            </div>

            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="confirmPassword"
                className={`col-form-label required ${styles["register-label-group"]}`}
              >
                確認密碼
              </label>
              <div className={` ${styles["register-input-group"]}`}>
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  value={formData.password2}
                  onChange={fieldChanged}
                  onBlur={password2Blur}
                  style={errorMsg.password2 ? redBorder : {}}
                  placeholder="再輸入一次密碼"
                  autoComplete="new-password" // 添加 autocomplete 屬性
                />
                <div className="form-text" style={redText}>
                  {errorMsg.password2}
                </div>
              </div>
            </div>

            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="inputUserName"
                className={`col-form-label required ${styles["register-label-group"]}`}
              >
                姓名
              </label>
              <div className={` ${styles["register-input-group"]}`}>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="username"
                  value={formData.username}
                  onChange={fieldChanged}
                  onBlur={nameBlur}
                  style={errorMsg.username ? redBorder : {}}
                  autoComplete="name" // 添加 autocomplete 屬性
                />
                <div className="form-text" style={redText}>
                  {errorMsg.username}
                </div>
              </div>
            </div>
            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="inputNickName"
                className={`col-form-label ${styles["register-label-group"]}`}
              >
                暱稱
              </label>
              <div className={` ${styles["register-input-group"]}`}>
                <input
                  type="text"
                  className="form-control"
                  id="inputNickName"
                  name="nickname"
                  value={formData.nickname}
                  onChange={fieldChanged}
                />
              </div>
            </div>
            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="inputBirthday"
                className={`col-form-label ${styles["register-label-group"]}`}
              >
                生日
              </label>
              <div className={` ${styles["register-input-group"]}`}>
                <div className="input-group position-relative d-inline-flex align-items-center">
                  <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={fieldChanged}
                  />
                </div>
                <div className="form-text"></div>
              </div>
            </div>
            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="userPhone"
                className={`col-form-label required ${styles["register-label-group"]}`}
              >
                手機
              </label>
              <div className={` ${styles["register-input-group"]}`}>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={fieldChanged}
                  onBlur={mobileBlur}
                  style={errorMsg.mobile ? redBorder : {}}
                  autoComplete="tel" // 添加 autocomplete 屬性
                />
                <div className="form-text" style={redText}>
                  {errorMsg.mobile}
                </div>
              </div>
            </div>
            <fieldset className={`d-flex ${styles["register-form-group"]}`}>
              <legend className="col-form-label col-sm-2 pt-0">性別</legend>
              <div className="col-sm-6 d-flex ms-2">
                <div className="form-check ms-1">
                  <input
                    className="form-check-input form-radio"
                    type="radio"
                    name="gender"
                    id="gender1"
                    // defaultValue="option1"
                    // defaultChecked=""
                    value={"女"} // 布林值轉換為字串
                    onChange={fieldChanged}
                  />
                  <label className="form-check-label" htmlFor="gender">
                    女
                  </label>
                </div>
                <div className="form-check mx-3">
                  <input
                    className="form-check-input form-radio"
                    type="radio"
                    name="gender"
                    id="gender2"
                    value={"男"} // 布林值轉換為字串
                    onChange={fieldChanged}
                    // defaultValue="option2"
                  />
                  <label className="form-check-label" htmlFor="gender">
                    男
                  </label>
                </div>
              </div>
            </fieldset>
            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="inputNickName"
                className={`col-form-label ${styles["register-label-group"]}`}
              >
                地址
              </label>
              <div className={` ${styles["register-input-group"]}`}>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={fieldChanged}
                />
              </div>
            </div>

            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="prefer"
                className={`col-form-label ${styles["register-label-group"]}`}
              >
                偏好主題
              </label>
              <div className={`col-sm-9 ${styles["register-input-group"]}`}>
                <div>
                  <input
                    type="checkbox"
                    name="tag_id"
                    value={"1"}
                    onChange={fieldChanged}
                  />
                  <label htmlFor="親子同樂">親子同樂</label>
                  <input
                    type="checkbox"
                    name="tag_id"
                    value={"2"}
                    onChange={fieldChanged}
                  />
                  <label htmlFor="恐怖驚悚">恐怖驚悚</label>
                  <input
                    type="checkbox"
                    name="tag_id"
                    value={"3"}
                    onChange={fieldChanged}
                  />
                  <label htmlFor="謎題邏輯">謎題邏輯</label>
                  <input
                    type="checkbox"
                    name="tag_id"
                    value={"4"}
                    onChange={fieldChanged}
                  />
                  <label htmlFor="劇情體驗">劇情體驗</label>
                  <br />
                  <input
                    type="checkbox"
                    name="tag_id"
                    value={"5"}
                    onChange={fieldChanged}
                  />
                  <label htmlFor="真實逃脫">真實逃脫</label>

                  <input
                    type="checkbox"
                    name="tag_id"
                    value={"6"}
                    onChange={fieldChanged}
                  />
                  <label htmlFor="角色扮演">角色扮演</label>
                  <input
                    type="checkbox"
                    value={"7"}
                    name="tag_id"
                    onChange={fieldChanged}
                  />
                  <label htmlFor="星際科幻">星際科幻</label>
                  <input
                    type="checkbox"
                    value={"8"}
                    name="tag_id"
                    onChange={fieldChanged}
                  />
                  <label htmlFor="歷史遠古">歷史遠古</label>
                </div>
              </div>
            </div>
            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label htmlFor="direction" className="col-sm-2 col-form-label">
                說明
              </label>
              <div className="col-sm-9">
                姓名欄位因寄送需求，請務必填寫收件者可收件之真實姓名。
              </div>
            </div>
            {/* <div className={`${styles["privacy_area"]}`}>
              <label className={`${styles["form-checkbox"]}`}>
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={fieldChanged}
                />{" "}
                <i className="ic_checkbox me-1" />
                同意成為本網站會員，享受各項會員權益，
                <span>
                  了解
                  <a href="#" className="web-member lity-btn">
                    會員條款
                  </a>
                </span>
              </label>
              <div className="form-text" style={redText}>
                {errorMsg.agree}
              </div>
              <label className={"form-checkbox checked"}>
                <input
                  type="checkbox"
                  defaultValue="Y"
                  name="privacy_agree"
                  checked={formData.agree}
                  onChange={fieldChanged}
                />
                <i className="ic_checkbox me-1" />{" "}
                我同意提供以上個人資料連繫使用。您的個人資料受到嚴格控管，絕不做其他用途使用。
              </label>
              <div className="row mb-2">
                <p className={`${styles["notice"]}`}>
                  如建立帳號，即代表同意本站
                  <Link href="/about">隱私權政策</Link>和
                  <Link href="/about">使用條款</Link>。
                </p>
              </div>
            </div> */}
            <button type="button" onClick={onSubmit} className={`btn ${styles["register-btn"]}`}>
              註冊
            </button>
            <button onClick={fillFormWithDemoData} type="button" className={`btn ${styles["register-btn"]}`}>
              一鍵輸入
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
