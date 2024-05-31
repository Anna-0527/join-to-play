import React, { useState, useEffect } from "react";
import { ORDER_LIST_ITEM } from "@/components/config";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./member.module.css";
import { useAuth } from "@/contexts/auth-context";

export default function OrderList() {
  const { auth, getAuthHeader } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    customer: 0,
    id: "",
    total_price: "",
    payment_method: "",
    delivery_method: "",
  });
  
  useEffect(() => {
    console.log(auth);
    // if (!auth.id) return; // 如果沒有 sid 的值, 就不用發 AJAX
  
    const member_id = auth.id;
    console.log(`${ORDER_LIST_ITEM}?${member_id}`);
    fetch(`${ORDER_LIST_ITEM}?member_id=${member_id}`, {
      headers: { ...getAuthHeader() },
    })
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (result.success && result.data ) {
          setFormData(result.data);
        } 
      });
  }, [auth, router ]);

  console.log(formData);

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className={`${styles['q-col']}`}>訂單編號</th>
            {/* <th scope="col" className={`${styles['q-col']}`}>數量</th> */}
            <th scope="col" className={`${styles['q-col-1']}`}>金額</th>
            <th scope="col" className={`${styles['q-col-1']}`}>付款方式</th>
            <th scope="col" className={`${styles['q-col-1']}`}>運送方式</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(formData).map((v, i) => (
            <tr key={i}>
              <td>{v.id}</td>
              <td>{v.total_price}</td>
              <td>{v.payment_method}</td>
              <td>{v.delivery_method}</td>
              {/* <td>{v.question_reply}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
