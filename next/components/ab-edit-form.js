import React, { useEffect, useState } from "react";
import { AB_ITEM_UPDATE_PUT, AB_ITEM } from "@/components/config";
import { useRouter } from "next/router";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function AbEditForm({ sid }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sid: 0, // 資料的 primary key
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
      return; // 沒通過檢查的話, 就返回
    }

    const dataModified = {...formData};
    // 沒有要更動的欄位去掉
    delete dataModified.sid;
    delete dataModified.created_at;

    const r = await fetch(`${AB_ITEM_UPDATE_PUT}/${sid}`, {
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

  useEffect(()=>{
    if(! sid) return; // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${AB_ITEM}/${sid}`)
    .then(r=>r.json())
    .then(result=>{
      console.log(result);
      if(result.success){
        setFormData({...result.data});
      } else {
        router.push("/address-book");
      }
    });
  }, [ sid, router ]);
  // console.log(formData);
  return (
    <div className="row">
      <div className="col-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">修改通訊錄 {sid}</h5>

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
                修改
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
