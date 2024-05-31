import React, { useState, useEffect } from "react";
import { BOOKING_LIST_ITEM } from "@/components/config";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./member.module.css";
import { useAuth } from "@/contexts/auth-context";

export default function BookingList() {
  const { auth, getAuthHeader } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    member_sid: 0,
    store_name: "",
    booking_date: "",
    booking_time: "",
    player_count: "",
    // created_at: "",
  });

  useEffect(() => {
    console.log(auth);
    // if (!auth.id) return; // 如果沒有 sid 的值, 就不用發 AJAX

    const member_id = auth.id;
    console.log(`${BOOKING_LIST_ITEM}?${member_id}`);
    fetch(`${BOOKING_LIST_ITEM}?member_id=${member_id}`, {
      headers: { ...getAuthHeader() },
    })
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (
          result.success &&
          result.data 
        ) {
          setFormData(result.data);
        } 
      });
  }, [auth, router]);

  console.log(formData);

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className={`${styles["b-col"]}`}>
              店家名稱
            </th>

            <th scope="col" className={`${styles["b-col-1"]}`}>
              預約日期
            </th>
            <th scope="col" className={`${styles["b-col-1"]}`}>
              預約時間
            </th>
            <th scope="col" className={`${styles["b-col-1"]}`}>
              玩家人數
            </th>
            {/* <th scope="col" className={`${styles["q-col"]}`}>
              加入預約時間
            </th> */}
          </tr>
        </thead>
        <tbody>
          {Object.values(formData).map((v, i) => (
            <tr key={i}>
              <td>{v.store_name}</td>
              <td>{v.booking_date}</td>
              <td>{v.booking_time}</td>
              <td>{v.player_count}</td>
              {/* <td>{v.created_at}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
