import React, { useEffect, useState } from "react";
import { API_SERVER, MEMBER_ITEM_UPDATE_PUT } from "@/components/config";
import { useRouter } from "next/router";
import styles from "./member.module.css";
import { useAuth } from "@/contexts/auth-context";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function MemberAccount({ id }) {
  const router = useRouter();
  const { auth, logout } = useAuth();
  const [formData, setFormData] = useState({
    id: 0,
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

  const validateName = (username) => {
    return username.toString().length >= 2;
  };
  const validateEmail = (email) => {
    return email.toString().indexOf("@") >= 0; // 粗略的判斷方式
  };
  const validateMobile = (mobile) => {
    return /^09\d{2}-?\d{3}-?\d{3}$/.test(mobile);
  };

  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const validateFields = () => {
    let tmpIsPass = true;
    let tmpErrorMsg = { ...errorMsg };
    // 欄位資料驗證
    if (!validateName(formData.name)) {
      tmpErrorMsg = { ...tmpErrorMsg, name: "請輸入正確的姓名" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, name: "" };
    }

    if (!validateEmail(formData.email)) {
      tmpErrorMsg = { ...tmpErrorMsg, email: "請輸入正確的 Email" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, email: "" };
    }

    if (!validateMobile(formData.mobile)) {
      tmpErrorMsg = { ...tmpErrorMsg, mobile: "請輸入正確的手機號碼" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, mobile: "" };
    }
    setErrorMsg(tmpErrorMsg);
    return tmpIsPass;
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 表單不要以傳統方式送出
    if (!validateFields()) {
      alert("必填欄位請填入符合格式的值");
      return;
    }

    const dataModified = { ...formData };
    delete dataModified.id;
    delete dataModified.created_at;

    // TODO 後端需再寫入接收陣列的程式
    // tag_id 多選做法
    // const fd = new FormData(e.target);
    // const tag_ids = fd.getAll("tag_id");
    // console.log(tag_ids);

    const r = await fetch(`${MEMBER_ITEM_UPDATE_PUT}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataModified),
    });

    const result = await r.json();

    console.log(result);
    if (result.success) {
      alert("資料修改成功");
      console.log(document.referrer);
      // 註冊後跳回首頁
      router.back();
    } else {
      alert("資料修改失敗");
    }
  };

  // 會員登入後,取得資訊
  useEffect(() => {
    console.log(auth);
    if (auth.id) {
      fetch(`${API_SERVER}/account`, {
        //credentials: 'include',
        headers: new Headers({
          Authorization: `Bearer ${auth.token}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => console.error("獲取資料時出錯:", error));
    }
  }, [auth.id]);

  return (
    <>
      <div className={`container p-3 ${styles["join_form"]}`}>
        <div>
          <h2 className={`ms-3 mb-5 ${styles["join_form-title"]}`}>會員資料</h2>
        </div>
        <div className={`${styles["register-content"]}`}>
          <form onSubmit={onSubmit} className={`${styles["register-form"]}`}>
            <div>
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
                    style={errorMsg.email ? redBorder : {}}
                    autoComplete="email"
                    disabled // 添加 autocomplete 屬性
                  />
                  <div className="form-text" style={redText}>
                    {errorMsg.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex">
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
                    placeholder="6-15碼，英文+數字，大小寫不同"
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
                    placeholder="再輸入一次密碼"
                    autoComplete="new-password" // 添加 autocomplete 屬性
                  />
                  <div className="form-text" style={redText}>
                    {errorMsg.password2}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex">
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
                    style={errorMsg.name ? redBorder : {}}
                    autoComplete="name" // 添加 autocomplete 屬性
                  />
                  <div className="form-text" style={redText}>
                    {errorMsg.name}
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
            </div>
            <div className="d-flex">
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
                    style={errorMsg.mobile ? redBorder : {}}
                    autoComplete="tel" // 添加 autocomplete 屬性
                  />
                  <div className="form-text" style={redText}>
                    {errorMsg.mobile}
                  </div>
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
                    value={"0"} // 布林值轉換為字串
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
                    value={"1"} // 布林值轉換為字串
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
                htmlFor="perfer"
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

            <button type="submit" className={`btn ${styles["register-btn"]}`}>
              編輯
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
