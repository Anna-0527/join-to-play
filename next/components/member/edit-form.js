import React, { useEffect, useState } from "react";
import { MEMBER_ITEM_UPDATE_PUT, AB_ITEM } from "@/components/config";
import { useRouter } from "next/router";
import styles from "./member.module.css";
import Sidebar from "../layout/member-layout/sidebar";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function EditForm({ id }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: 0, //資料的pk
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
  });
  // 欄位預設的錯誤訊息
  const [errorMsg, setErrorMsg] = useState({
    username: "",
    mobile: "",
    password: "",
    password2: "",
  });

  const validateName = (name) => {
    return name.toString().length >= 2;
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
    if (!validateName(formData.username)) {
      tmpErrorMsg = { ...tmpErrorMsg, name: "請輸入正確的姓名" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, username: "" };
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
      return; // 沒通過檢查的話, 就返回
    }

    const dataModified = { ...formData };
    // 沒有要更動的欄位去掉
    delete dataModified.id;
    delete dataModified.created_at;

    const r = await fetch(`${MEMBER_ITEM_UPDATE_PUT}/${id}`, {
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
      router.back();
    } else {
      alert("資料沒有修改");
    }
  };

  useEffect(() => {
    if (!id) return; // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${AB_ITEM}/${id}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setFormData({ ...result.data });
        } else {
          router.push("/");
        }
      });
  }, [id, router]);
  // console.log(formData);
  return (
    <div className="row d-flex">
      {/* <Sidebar /> */}
      <div className="container w-600">
        <div className="card-body">
          <h5 className="card-title">修改 會員資料 </h5>
          <form name="form1" onSubmit={onSubmit}>
            <div className="container-fluid" id="join_form">
              <div className="card-body">
                {/* <div className="row mb-3 mx-3">
                        <label
                          htmlFor="memberLevel"
                          className="col-sm-2 col-form-label"
                        >
                          會員等級
                        </label>
                        <div className="col-sm-9"></div>
                      </div> */}
                <div className="row mb-3 mx-3">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      defaultValue={formData.email}
                    />
                  </div>
                </div>
                <div className="row mb-3 mx-3">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    修改密碼
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={formData.password}
                      onChange={fieldChanged}
                      placeholder="6-15碼，英文+數字，大小寫不同"
                    />
                    <div className="form-text" style={redText}>
                      {errorMsg.password}
                    </div>
                  </div>
                </div>
                <div className="row mb-3 mx-3">
                  <label
                    htmlFor="confirmPassword"
                    className="col-sm-2 col-form-label"
                  >
                    確認密碼
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      name="password2"
                      value={formData.password2}
                      onChange={fieldChanged}
                      placeholder="再輸入一次密碼"
                    />
                    <div className="form-text" style={redText}>
                      {errorMsg.password2}
                    </div>
                  </div>
                </div>
                <div className="row mb-3 mx-3">
                  <label
                    htmlFor="inputUserName"
                    className="col-sm-2 col-form-label"
                  >
                    姓名
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="username"
                      value={formData.username}
                      onChange={fieldChanged}
                      style={errorMsg.name ? redBorder : {}}
                    />
                  </div>
                </div>
                <div className="row mb-3 mx-3">
                  <label
                    htmlFor="inputNickName"
                    className="col-sm-2 col-form-label"
                  >
                    暱稱
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="inputNickName"
                      name="nickname"
                      value={formData.nickname}
                      onChange={fieldChanged}
                    />
                  </div>
                </div>
                <div className="row mb-3 mx-3">
                  <label
                    htmlFor="inputBirthday"
                    className="col-sm-2 col-form-label"
                  >
                    生日
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      id="birthday"
                      name="birthday"
                      value={formData.birthday}
                      onChange={fieldChanged}
                    />
                  </div>
                </div>
                <div className="row mb-3 mx-3">
                  <label
                    htmlFor="userPhone"
                    className="col-sm-2 col-form-label"
                  >
                    手機
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={fieldChanged}
                      style={errorMsg.mobile ? redBorder : {}}
                    />
                  </div>
                </div>
                <fieldset className="row mb-3 mx-3">
                  <legend className="col-form-label col-sm-2 pt-0">性別</legend>
                  <div className="col-sm-6 d-flex">
                    <div className="form-check mx-1">
                      <input
                        className="form-check-input form-radio"
                        type="radio"
                        name="gender"
                        id="gender1"
                        value={"0"} // 布林值轉換為字串
                        onChange={fieldChanged}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
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
                      />
                      <label className="form-check-label" htmlFor="gridRadios2">
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
                <button type="submit" className="btn btn-primary mx-auto">
                  儲存變更
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
