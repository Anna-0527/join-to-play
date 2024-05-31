import React, { useState, useEffect } from "react";
import { TR_STORE_ITEM, API_SERVER } from "../config";
import { useRouter } from "next/router";
import Link from "next/link";
// import styles from "./member.module.css";
import { useAuth } from "@/contexts/auth-context";
import { FaTrashAlt } from "react-icons/fa";

export default function TrStore() {
  const { auth, getAuthHeader } = useAuth();
  const router = useRouter();
  // 用來接收 fetch資料 的狀態
  const [trStoreData, setTrStoreData] = useState({
    member_sid: 0,
    store_name: "",
    store_address: "",
    store_phone: "",
    business_hours: "",
  });

  const [toggleBtn, setToggleBtn] = useState(true);

  useEffect(() => {
    const member_sid = auth.id;
    console.log(`${TR_STORE_ITEM}?${member_sid}`);
    fetch(`${TR_STORE_ITEM}?member_sid=${member_sid}`, {
      headers: { ...getAuthHeader() },
    })
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (
          result.success &&
          result.data 
        ) {
          setTrStoreData(result.data);
        } else {
          // router.push("/member/tr-store");
        }
      });
  }, [auth, router, toggleBtn]);

  console.log(trStoreData);

  const handleRemoveFavorite = async (sid) => {
    try {
      const url = `${API_SERVER}/tr-store/del-likes`;
      const member_sid = auth.id;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member_sid),
      });

      if (response.ok) {
        // 成功刪除後更新狀態以重新加載收藏資料
        setToggleBtn(!toggleBtn);
        alert.success("已取消收藏");
      } else {
        console.error("取消收藏失敗");
      }
    } catch (error) {
      console.error("取消收藏失敗", error);
    }
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">店家名稱</th>
            <th scope="col">店家電話</th>
            <th scope="col">店家地址</th>
            <th scope="col">營業時間</th>
            {/* <th scope="col">取消收藏</th> */}
          </tr>
        </thead>
        <tbody>
          {Object.values(trStoreData).map((v, i) => (
            <tr key={i}>
              <td>{v.store_name}</td>
              <td>{v.store_phone}</td>
              <td>{v.store_address}</td>
              <td>{v.business_hours}</td>
              {/* <td>
                <FaTrashAlt />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
