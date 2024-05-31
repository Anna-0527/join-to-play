import React, { useState } from "react";
import { AB_ADD_POST } from "@/components/config";
import { useRouter } from "next/router";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function AbAddForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    birthday: "",
    address: "",
  });
  // 欄位預設的錯誤訊息
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  // 整個表單有沒有通過檢查
  const [isPass, setIsPass] = useState(false);

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
    /*
    let tmpIsPass = true;
    let tmpErrorMsg = { ...errorMsg };
    // 欄位資料驗證
    if (!validateName(newFormData.name)) {
      tmpErrorMsg = { ...tmpErrorMsg, name: "請輸入正確的姓名" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, name: "" };
    }

    if (!validateEmail(newFormData.email)) {
      tmpErrorMsg = { ...tmpErrorMsg, email: "請輸入正確的 Email" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, email: "" };
    }

    if (!validateMobile(newFormData.mobile)) {
      tmpErrorMsg = { ...tmpErrorMsg, mobile: "請輸入正確的手機號碼" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, mobile: "" };
    }
    setErrorMsg(tmpErrorMsg);
    setIsPass(tmpIsPass);
    */
  };

  const nameBlur = () => {
    if (!validateName(formData.name)) {
      setErrorMsg({ ...errorMsg, name: "請輸入正確的姓名" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, name: "" });
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

    const tmpIsPass = nameBlur() && emailBlur() && mobileBlur();
    setIsPass(tmpIsPass);
    if (tmpIsPass) {
      //console.log("表單送出");
      const r = await fetch(AB_ADD_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await r.json();

      console.log(result);
      if(result.success){
        alert("資料新增成功");
        router.push("/address-book");
      } else {
        alert("資料沒有新增");
      }

    } else {
      alert("必填欄位請填入符合格式的值");
    }
  };

  // console.log(formData);
  return (
    <div className="row">
      <div className="col-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">新增通訊錄</h5>

            <form name="form1" onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  ** 姓名
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={fieldChanged}
                  onBlur={nameBlur}
                  style={errorMsg.name ? redBorder : {}}
                />
                <div className="form-text" style={redText}>
                  {errorMsg.name}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  電子郵箱
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={fieldChanged}
                  onBlur={emailBlur}
                  style={errorMsg.email ? redBorder : {}}
                />
                <div className="form-text" style={redText}>
                  {errorMsg.email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  手機
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={fieldChanged}
                  onBlur={mobileBlur}
                  style={errorMsg.mobile ? redBorder : {}}
                />
                <div className="form-text" style={redText}>
                  {errorMsg.mobile}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="birthday" className="form-label">
                  生日
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  name="birthday"
                  value={formData.birthday}
                  onChange={fieldChanged}
                />
                <div className="form-text"></div>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  地址
                </label>
                <textarea
                  className="form-control"
                  name="address"
                  id="address"
                  cols="30"
                  rows="3"
                  value={formData.address}
                  onChange={fieldChanged}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                新增
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
