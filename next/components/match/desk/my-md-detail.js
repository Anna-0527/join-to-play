import React from "react";
import Link from "next/link";

import { MD_ITEM, MD_MEMBER_ADD_POST } from "@/components/config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function MyMatchDetail({ md_id }) {
  const router = useRouter();

  const [data, setData] = useState({
    md_id: 0,
    match_name: "",
    store_name: "",
    booking_date: "",
    booking_time: "",
    mdm_id: 0,
    current_count: "",
    player_count: "",
    special_request: "",
    match_desk_member: "",
    username: "",
    nicknames: [],
    confirmed: "",
  });

  useEffect(() => {
    if (!md_id) return; // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${MD_ITEM}/${md_id}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setData({ ...result.data });
        } else {
          router.push("/match/desk");
        }
      });
  }, [md_id, router]);
  console.log(data);

  const AddInTheMatch = async (e) => {
    e.preventDefault();
    console.log("按下加入了");
    // 要修改
    const r = await fetch(`${MD_MEMBER_ADD_POST}/${md_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);
    const result = await r.json();

    console.log(result);
    if (result.success) {
      alert("您已成功加入揪團");
      router.push(`/match/desk/detail/${md_id}`);
    } else {
      alert(`加入失敗，${JSON.stringify(result.info).slice(1, -1)}`);
    }

    console.log("送完表單");
  };

  const sendMatchOrder = async(e)=>{
    e.preventDefault();
    console.log('按下按鈕');
    const r = await fetch(`http://localhost:3001/email/send/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await r.json();
    
    console.log(result);
    if (result.status) {
      alert("恭喜揪團成功~~~~~~~");
      router.back();
    } else {
      alert("失敗!");
    }

    console.log("送完表單");
  }



  return (
    <>
      <ul className="list-group list-group-flush ">
        <li className="list-group-item" style={{ backgroundColor: "#f9c900" }}>
          <div className="row">
            <div className="col-2 my-auto ms-2">
              <i className="bi bi-people-fill" />
            </div>
            <div className="col-7 my-auto">
              <span>{data.match_name}</span>
            </div>
            <div className="col-2 text-end ms-2">
              <Link
                href={`/match/desk/edit/${md_id}`}
                className="btn btn-light btn-sm"
              >
                編輯
                <i className="bi bi-pencil " />
              </Link>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2 ms-2">
              <i className="bi bi-shop" />
            </div>
            <div className="col-auto">
              <span>{data.store_name}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2  ms-2">
              <i className="bi bi-geo-alt-fill" />
            </div>
            <div className="col-auto">
              <span>{data.store_address}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2  ms-2">
              <i className="bi bi-calendar-check" />
            </div>
            <div className="col-auto">
              <span>{data.booking_date}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2  ms-2">時段</div>
            <div className="col-auto">
              <span>{data.booking_time}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2  ms-2">人數</div>
            <div className="col-auto">
              <span>
                {data.current_count} (上限： {data.player_count} 人)
              </span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2  ms-2">團長</div>
            <div className="col-auto">
              <span>{data.nickname}</span>
            </div>
          </div>
        </li>
        {data &&
          data.nicknames.map((nickname, i) => {
            return (
              <li key={i} className="list-group-item">
                <div className="row">
                  <div className="col-2  ms-2">團員</div>
                  <div className="col-auto">
                    <span>{nickname}</span>
                  </div>
                </div>
              </li>
            );
          })}

        <li className="list-group-item">
          <div className="row">
            <div className="col-2  ms-2">備註</div>
            <div className="col-auto">
              <span>{data.special_request}</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row my-3 d-flex justify-content-evenly">
            <div className="col-auto">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  router.back();
                }}
              >
                返回前頁
              </button>
            </div>
            <div className="col-auto">
              {data.confirmed == 1 ? (
                <button className="btn btn-primary" type="button"
                onClick={sendMatchOrder}>
                  送出預約
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={AddInTheMatch}
                >
                  立即加入
                </button>
              )}
            </div>
          </div>
        </li>
      </ul>

      <style jsx>
        {`
          ul {
            border-radius: 10px;
            padding: 20px;
          }
          li {
            padding: 20px;
          }
        `}
      </style>
    </>
  );
}
