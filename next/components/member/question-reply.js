import React, { useState, useEffect } from "react";
import { REPLY_ITEM } from "@/components/config";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./member.module.css";
import { useAuth } from "@/contexts/auth-context";

export default function QuestionReply() {
  const { auth, getAuthHeader } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    member_id: 0,
    title: "",
    question_class: "",
    question_content: "",
    question_reply: "",
  });
  
  useEffect(() => {
    console.log(auth);
    // if (!auth.id) return; // 如果沒有 sid 的值, 就不用發 AJAX
  
    const member_id = auth.id;
    console.log(`${REPLY_ITEM}?${member_id}`);
    fetch(`${REPLY_ITEM}?member_id=${member_id}`, {
      headers: { ...getAuthHeader() },
    })
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (result.success && result.data ) {
          setFormData(result.data);
        } else {
          // router.push("/member/question-reply");
        }
      });
  }, [auth, router]);

  console.log(formData);

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className={`${styles['q-col']}`}>主旨</th>
            <th scope="col" className={`${styles['q-col']}`}>問題分類</th>
            <th scope="col" className={`${styles['q-col-1']}`}>問題內容</th>
            <th scope="col" className={`${styles['q-col-1']}`}>客服回應</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(formData).map((v, i) => (
            <tr key={i}>
              <td>{v.title}</td>
              <td>{v.question_class}</td>
              <td>{v.question_content}</td>
              <td>{v.question_reply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
