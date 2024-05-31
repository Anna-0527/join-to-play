import Head from "next/head";
import Layout1 from "@/components/common/Layout1";
import { useState, useContext } from "react";
import {useAuth} from "@/contexts/auth-context";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ account, password });
    login(account, password).then((result) => {
      if (result) {
        alert("登入成功");
        router.push("/");
      } else {
        alert("登入失敗");
      }
    });
  };

  return (
    <Layout1 pageName="login">
      <Head>
        <title>會員登入</title>
      </Head>

      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">會員登入</h5>

              <form name="form1" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="account" className="form-label">
                    帳號 (email)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="account"
                    name="account"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    密碼
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  登入
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout1>
  );
}
