import React, { useState, useEffect } from "react";
import { STORE_ESCAPE, JWT_TOGGLE_LIKE } from "@/components/config";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router";
import Head from "next/head";

export default function StoreCardEscape({ sid }) {
  const { auth, getAuthHeader } = useAuth();

  const router = useRouter();

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  });

  // useEffect(() => {
  //   fetch(STORE_ESCAPE)
  //     .then((r) => r.json())
  //     .then((dataObj) => {
  //       setData(dataObj);
  //       console.log(dataObj);
  //     });
  // }, []); // 空的依賴數組表示只在初始化時執行一次

  const [likedStores, setLikedStores] = useState({});

  useEffect(() => {
    // 初始化收藏状态
    initializeLikedStores();
    // 获取店铺数据
    fetchData();
  }, []);

  // 初始化收藏状态
  const initializeLikedStores = () => {
    const storedLikes = JSON.parse(sessionStorage.getItem("likes")) || {};
    setLikedStores(storedLikes);
  };

  // 获取店铺数据
  const fetchData = () => {
    fetch(STORE_ESCAPE)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj);
        console.log(dataObj);
      });
  };

  // 切换收藏状态
  const toggleLike = async (sid) => {
    const r = await fetch(`${JWT_TOGGLE_LIKE}/${sid}`, {
      headers: { ...getAuthHeader() },
    });
    const result = await r.json();
    if (result.success) {
      const like_sid = result.action === "add" ? 1 : null;
      const updatedLikedStores = { ...likedStores, [sid]: like_sid };
      setLikedStores(updatedLikedStores);
      sessionStorage.setItem("likes", JSON.stringify(updatedLikedStores));
      setData((oldData) => {
        const newRows = oldData.rows.map((v) => {
          if (v.sid === sid) {
            return { ...v, like_sid };
          } else {
            return { ...v };
          }
        });
        return { ...oldData, rows: newRows };
      });
    }
  };

  // const toggleLike = async (sid) => {
  //   const r = await fetch(`${JWT_TOGGLE_LIKE}/${sid}`, {
  //     headers: { ...getAuthHeader() },
  //   });
  //   const result = await r.json();
  //   if (result.success) {
  //     // "action": "remove", "add"
  //     setData((old) => {
  //       const newRows = old.rows.map((v) => {
  //         if (v.sid === sid) {
  //           const like_sid = result.action === "add" ? 1 : null;
  //           return { ...v, like_sid };
  //         } else {
  //           return { ...v };
  //         }
  //       });
  //       return { ...old, rows: newRows };
  //     });
  //   }
  // };

  // 处理预约按钮点击事件
  const handleReservation = (storeId) => {
    console.log(sid);
    // 构建目标URL，将店家ID作为查询参数传递
    const url = `/booking/booking-es2?sid=${storeId}`;
    // 跳转到下一个页面
    router.push(url);
  };

  return (
    <>
      <Head>
        <title>店家資訊</title>
      </Head>

      {!data.success ? (
        <div>loading ...</div>
      ) : (
        <div className="storeCard1 mb-5">
          {data.rows.map((v) => (
            <div className="storeCard2" key={v.sid}>
              <div className="card h-100 storeCard3">
                <div className="storeCardNoButton">
                  <span onClick={(e) => toggleLike(v.sid)}>
                    {likedStores[v.sid] ? (
                      <i className="bi bi-suit-heart-fill storeCollectClicked" />
                    ) : (
                      <i className="bi bi-suit-heart storeCollect" />
                    )}
                  </span>
                  <img
                    src={`/images/booking/${v.store_pic}.jpg`}
                    className="storePic"
                    alt="storePic"
                  />

                  <div className="storeCardBody">
                    {/* 左邊 */}
                    <div className="storeLogoDiv">
                      <img
                        src={`/images/booking/${v.store_logo}.png`}
                        className="storeLogo"
                        alt="storeLogo"
                      />
                    </div>
                    {/* 右邊 */}
                    <div className="storeDesc">
                      <h4 className="fw-bold storeName">{v.store_name}</h4>
                      <p className="storeAddress">
                        {v.store_address.substring(0, 3) +
                          "，" +
                          v.store_address.substring(3, 6)}
                      </p>
                      <p className="star">
                        {[...Array(Math.floor(v.rating))].map((_, index) => (
                          <i className="bi bi-star-fill star" key={index} />
                        ))}
                        {v.rating % 1 >= 0.5 && (
                          <i className="bi bi-star-half star" />
                        )}
                        {[...Array(5 - Math.ceil(v.rating))].map((_, index) => (
                          <i className="bi bi-star star" key={index} />
                        ))}
                      </p>
                      <span className="starCount">({v.rating})</span>
                      {/* <p className="star">
                        <i className="bi bi-star-fill star" />
                        <i className="bi bi-star-fill star" />
                        <i className="bi bi-star-fill star" />
                        <i className="bi bi-star-fill star" />
                        <i className="bi bi-star-half star" />
                      </p> */}
                    </div>
                    <ul className="storeLi">
                      <li>
                        <i className="bi bi-telephone pe-2" /> {v.store_phone}
                      </li>
                      <li>
                        <i className="bi bi-house pe-2" /> {v.store_address}
                      </li>
                      <li>
                        <i className="bi bi-clock pe-2" /> {v.business_hours}
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleReservation(v.sid)}
                  className="bookingBtn"
                >
                  立即預約
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
