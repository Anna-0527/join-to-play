import React, { useState } from "react";
import { BE_ADD_POST } from "@/components/config";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function BookingForm({
  storeName,
  gameName,
  bookingTime,
  bookingDate,
  storeId,
  gameId,
}) {
  const router = useRouter();

  const [showBookingForm, setShowBookingForm] = useState(true); // 控制 BookingForm 的顯示狀態

  const closeBookingForm = () => {
    setShowBookingForm(false);
  };

  const [formData, setFormData] = useState({
    store_id: storeId,
    store_name: storeName,
    game_id: gameId,
    game_name: gameName,
    member_name: "",
    member_id: "",
    // username: "",
    mobile: "",
    player_count: "",
    remark: "",
    booking_date: bookingDate, // 新增 booking_date 欄位
    booking_time: bookingTime, // 新增 booking_time 欄位
  });
  console.log("Booking date:", bookingDate); // 使用 formData 中的 booking_date
  console.log("Booking time:", bookingTime); // 使用 formData 中的 booking_time

  // 欄位預設的錯誤訊息
  const [errorMsg, setErrorMsg] = useState({
    member_name: "",
    // email: "",
    mobile: "",
  });
  // 整個表單有沒有通過檢查
  const [isPass, setIsPass] = useState(false);

  const validateName = (member_name) => {
    return member_name.toString().length >= 2;
  };
  // const validateEmail = (email) => {
  //     return email.toString().indexOf("@") >= 0; // 粗略的判斷方式
  // };
  const validateMobile = (mobile) => {
    return /^09\d{2}-?\d{3}-?\d{3}$/.test(mobile);
  };

  //   const fieldChanged = (e) => {
  //     const newFormData = { ...formData, [e.target.name]: e.target.value };
  //     setFormData(newFormData);
  //   };

  const fieldChanged = (e) => {
    const { name, value } = e.target;
    if (name === "member_name") {
      // 如果是 member_name 欄位，同時更新 member_name 和 username
      setFormData({ ...formData, [name]: value, username: value });
    } else {
      // 如果是其他欄位，只更新該欄位的值
      setFormData({ ...formData, [name]: value });
    }
  };

  const nameBlur = () => {
    if (!validateName(formData.member_name)) {
      setErrorMsg({ ...errorMsg, member_name: "請輸入正確的姓名" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, member_name: "" });
      return true;
    }
  };
  // const emailBlur = () => {
  //     if (!validateEmail(formData.email)) {
  //         setErrorMsg({ ...errorMsg, email: "請輸入正確的 Email" });
  //         return false;
  //     } else {
  //         setErrorMsg({ ...errorMsg, email: "" });
  //         return true;
  //     }
  // };
  const mobileBlur = () => {
    if (!validateMobile(formData.mobile)) {
      setErrorMsg({ ...errorMsg, mobile: "請輸入正確的手機號碼" });
      return false;
    } else {
      setErrorMsg({ ...errorMsg, mobile: "" });
      return true;
    }
  };

  const playerCountChanged = (e) => {
    const newFormData = { ...formData, player_count: e.target.value };
    setFormData(newFormData);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 表單不要以傳統方式送出

    const tmpIsPass = nameBlur() && mobileBlur();
    setIsPass(tmpIsPass);
    if (tmpIsPass) {
      const r = await fetch(BE_ADD_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await r.json();

      console.log(result);
      if (result.success) {
        alert("預約成功！");
        router.push("/member/booking-record");
      } else {
        alert("預約失敗");
      }
    } else {
      alert("必填欄位請輸入正確資訊");
    }
  };

  return (
    <>
      <div>
        {showBookingForm && (
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <span onClick={closeBookingForm}>
                    <i class="bi bi-chevron-left closeBookingForm"></i>
                  </span>
                  <span className="card-title bookingFormTitle">預約資訊</span>

                  <form name="form1" onSubmit={onSubmit}>
                    <div className="mb-3 mt-3">
                      <div>店家姓名</div>
                      <input
                        type="text"
                        className="form-control mt-1"
                        id="disabledInput"
                        value={storeName}
                        readOnly={true}
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <div>遊戲名稱</div>
                      <input
                        type="text"
                        className="form-control mt-1"
                        id="disabledInput"
                        value={gameName}
                        readOnly={true}
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="member_name" className="form-label">
                        <span className="redIcon">* </span>姓名
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="member_name"
                        name="member_name"
                        value={formData.member_name}
                        onChange={fieldChanged}
                        onBlur={nameBlur}
                        style={errorMsg.member_name ? redBorder : {}}
                      />
                      <div className="form-text" style={redText}>
                        {errorMsg.member_name}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label">
                        <span className="redIcon">* </span>手機
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
                      <label htmlFor="player_count" className="form-label">
                        預約人數
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={formData.player_count}
                        onChange={playerCountChanged}
                      >
                        <option disabled selected value="">
                          報名人數
                        </option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                      </select>
                      <div className="form-text"></div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="remark" className="form-label">
                        備註
                      </label>
                      <textarea
                        className="form-control"
                        name="remark"
                        id="remark"
                        cols="30"
                        rows="3"
                        value={formData.remark}
                        onChange={fieldChanged}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary bookingFormBtn"
                    >
                      預約完成
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
