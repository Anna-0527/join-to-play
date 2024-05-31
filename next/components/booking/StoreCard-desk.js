import React, { useState, useEffect } from 'react';
import { STORE_DESK, JWT_TOGGLE_LIKE } from "@/components/config";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router"
import Link from 'next/link';

export default function StoreCardDesk() {

  const { auth, getAuthHeader } = useAuth();

  const router = useRouter();

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: []
  });

  useEffect(() => {
    fetch(STORE_DESK)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj);
      });
  }, []); // 空的依賴數組表示只在初始化時執行一次

  const toggleLike = async (sid) => {
    const r = await fetch(`${JWT_TOGGLE_LIKE}/${sid}`, {
      headers: { ...getAuthHeader() },
    });
    const result = await r.json();
    if (result.success) {
      // "action": "remove", "add"
      setData((old) => {
        const newRows = old.rows.map((v) => {
          if (v.sid === sid) {
            const like_sid = result.action === "add" ? 1 : null;
            return { ...v, like_sid };
          } else {
            return { ...v };
          }
        });
        return { ...old, rows: newRows };
      });
    }
  };

  return (
    <>
      {!data.success ? (
        <div>loading ...</div>
      ) : (
        <div className="storeCard1">
          {data.rows.map((v) => (
            <div className="storeCard2" key={v.sid}>
              <div className="card h-100">
                <div className="storeCardNoButton">
                  <span onClick={(e) => toggleLike(v.sid)}>
                    {v.like_sid ? <i className="bi bi-suit-heart-fill storeCollectClicked" /> : <i className="bi bi-suit-heart storeCollect" />}
                  </span>
                  <img src="/images/booking/store12.jpg" className="storePic" alt="storePic" />

                  <div className="storeCardBody">
                    {/* 左邊 */}
                    <div className="storeLogoDiv">
                      <img src="/images/booking/storelogo.png" className="storeLogo" alt="storeLogo" />
                    </div>
                    {/* 右邊 */}
                    <div className="storeDesc">
                      <h4 className="fw-bold storeName">{v.store_name}</h4>
                      <p className="storeAddress">{v.store_address.substring(0, 3) + '，' + v.store_address.substring(3, 6)}</p>
                      <p className="star">
                        <i className="bi bi-star-fill star" />
                        <i className="bi bi-star-fill star" />
                        <i className="bi bi-star-fill star" />
                        <i className="bi bi-star-fill star" />
                        <i className="bi bi-star-half star" />
                      </p>
                      <span className="starCount">(62)</span>
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
                <Link href={`/booking/booking-de2`}>
                  <button className="bookingBtn">立即預約</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}