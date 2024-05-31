import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MD_ADD_POST, MATCH_LIST } from "@/components/config";

export default function MdAddForm() {
  const router = useRouter();

  const [storeData, setStoreData] = useState({
    deskRows: [],
  });

  const [formData, setFormData] = useState({
    match_name: "",
    store_id: "",
    // mobile: "",
    booking_date: "",
    booking_time: "",
    player_count: "",
    special_request: "",
    // address: "",
  });
  // 欄位預設的錯誤訊息
  const [errorMsg, setErrorMsg] = useState({
    match_name: "",
    email: "",
    mobile: "",
  });

  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };
  const fetchData = async (formAreaValue) => {
    try {
      const response = await fetch(`${MATCH_LIST}?formArea=${formAreaValue}`);
      if (!response.ok) {
        throw new Error("Failed to fetch store data");
      }
      const stData = await response.json();
      setStoreData(stData);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegionChange = (e) => {
    const formAreaValue = e.target.value;
    setFormData({ ...formData });
    fetchData(formAreaValue);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("送表單");
    const r = await fetch(MD_ADD_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await r.json();

    console.log(result);
    if (result.success) {
      alert("成功建立揪團");
      router.push("/match/desk");
    } else {
      alert("資料沒有新增");
    }

    console.log("送完表單");
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-10 col-lg-6 my-5 mx-auto">
          <form name="form1" onSubmit={onSubmit} className="create-match">
            {/* <h3>創建新團</h3> */}
            <div className="card my-5 ">
              <div className="card-header pt-4 pb-3 text-center">
                填寫表單，發起揪團～
              </div>
              <div className="card-body text-secondary p-5">
                <div className="row">
                  <div className="mb-2 col-sm-12 col-md-2 ">揪團類型</div>
                  <div className="col-5 mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        //記得要設定值
                        //value={""}
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        桌遊
                      </label>
                    </div>
                  </div>
                  <div className="col-5 mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        disabled
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        密室逃脫
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="matchTime">揪團名稱</label>
                  </div>
                  <div className="col-sm-12 col-md-10   py-3 ">
                    <input
                      type="text"
                      id="match_name"
                      name="match_name"
                      onChange={fieldChanged}
                      value={formData.match_name}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto ">選擇地區</div>
                  <div className="col-sm-6 col-md-5 py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleRegionChange}
                    >
                      <option defaultValue>選擇縣市</option>
                      <option value={1}>北部</option>
                      <option value={2}>中部</option>
                      <option value={3}>南部</option>
                      <option value={4}>東部</option>
                      <option value={5}>離島</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="deskShop">選擇店家</label>
                  </div>
                  <div className="col-sm-12 col-md-10    py-3 ">
                    <select
                      name="store_id"
                      className="form-select"
                      aria-label="Default select example"
                      value={formData.store_id}
                      onChange={fieldChanged}
                    >
                      <option defaultValue="">選擇店家</option>
                      {storeData.deskRows.map((item) => (
                        <option key={item.store_id} value={item.store_id}>
                          {item.store_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="booking_date">選擇日期</label>
                  </div>
                  <div className="col-sm-12 col-md-10   py-3 ">
                    <input
                      type="date"
                      id="booking_date"
                      name="booking_date"
                      value={formData.booking_date}
                      onChange={fieldChanged}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto ">
                    <label htmlFor="matchTime">選擇時段</label>
                  </div>
                  <div className="col-sm-12 col-md-10    py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="booking_time"
                      value={formData.booking_time}
                      onChange={fieldChanged}
                    >
                      <option defaultValue>選擇時段</option>
                      <option value={"11:00-14:00"}>11:00-14:00</option>
                      <option value={"14:00-17:00"}>14:00-17:00</option>
                      <option value={"17:00-20:00"}>17:00-20:00</option>
                      <option value={"20:00-23:00"}>20:00-23:00</option>
                      <option value={"23:00-02:00"}>23:00-02:00</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto ">
                    <label htmlFor="player_count">人數上限</label>
                  </div>
                  <div className="col-sm-12 col-md-10    py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={formData.player_count}
                      name="player_count"
                      onChange={fieldChanged}
                    >
                      <option defaultValue="">選擇人數</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="matchTime">其他備註</label>
                  </div>
                  <div className="col-sm-12 col-md-10   py-3 ">
                    <input
                      type="text"
                      id="special_request"
                      name="special_request"
                      value={formData.special_request}
                      onChange={fieldChanged}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center pt-4 my-auto">
                    <Link
                      href={"/match/desk"}
                      className="btn btn-secondary"
                      style={{ background: "#ffaf63", border: "none" }}
                    >
                      回前頁
                    </Link>
                  </div>
                  <div className="col text-center pt-4 my-auto">
                    <button type="submit" className="btn btn-dark">
                      送出
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .create-match .card {
          border: none;
          box-shadow: 0px 0px 3px #0001;
        }
        .create-match .card-header {
          background: #ffaf63;
        }
      `}</style>
    </>
  );
}
