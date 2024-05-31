import React, { useState } from "react";
import { CONTACT_ADD_POST } from "@/components/config";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./member.module.css";
import { useAuth } from "@/contexts/auth-context";
import LoginForm from "./login-form";

export default function Contact() {
  const { auth, getAuthHeader } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    member_id:auth.id,
    title: "",
    question_class: "",
    question_content: "",
  });

  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  
  console.log(formData);
  const onSubmit = async (e) => {
    e.preventDefault(); // 表單不要以傳統方式送出

    //console.log("表單送出");
    const r = await fetch(CONTACT_ADD_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await r.json();

    // console.log(result);
    if (result.success) {
      alert("確定要送出?");

      // 註冊後跳回首頁
      router.push("/member/question-reply");
    } else {
      alert("");
    }
  };

  // console.log(formData);

  return (
    <>
   
      <div className={`container p-3 ${styles["join_form"]}`}>
        <div className="d-flex">
          <h2 className={`ms-3 mb-5 ${styles["join_form-title"]}`}>聯絡客服</h2>
          <h4 className="mt-4 ms-4">
            Hi~ {auth?.nickname} 今天有哪方面的問題呢?
          </h4>
        </div>
        <div className={`${styles["register-content"]}`}>
          <form onSubmit={onSubmit} className={`${styles["register-form"]}`}>
            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="inputEmail"
                className={`col-form-label required ${styles["register-label-group"]}`}
              >
                主旨
              </label>
              <div className={`${styles["register-input-group"]}`}>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={fieldChanged}
                />
              </div>
            </div>

            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="userPhone"
                className={`col-form-label required ${styles["register-label-group"]}`}
              >
                問題分類
              </label>
              <div className={` ${styles["register-input-group"]}`}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="question_class"
                  value={formData.question_class}
                  onChange={fieldChanged}
                >
                  <option selected="">請選擇</option>
                  <option value="購物">購物</option>
                  <option value="預約">預約</option>
                  <option value="揪團">揪團</option>
                </select>
              </div>
            </div>

            <div className={`d-flex ${styles["register-form-group"]}`}>
              <label
                htmlFor="userPhone"
                className={`col-form-label required ${styles["register-label-group"]}`}
              >
                問題內容
              </label>
              <div className={` ${styles["register-input-group"]}`}>
                <textarea
                  className="form-control"
                  placeholder="請輸入內容"
                  type="text"
                  id="floatingTextarea2"
                  name="question_content"
                  style={{ height: 100 }}
                  onChange={fieldChanged}
                  value={formData.question_content}
                />
              </div>
            </div>
            <div className="mt-5">
              <button type="submit" className={`btn ${styles["register-btn"]}`}>
                送出
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
