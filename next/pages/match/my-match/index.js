import React, { useState } from "react";
import MyMatchList from "@/components/match/my-match-desk/list";
import { useEffect } from "react";
import Link from "next/link";
import { MY_MATCH_LIST } from "@/components/config";
import MemberLayout from "@/components/layout/member-layout";

import { useRouter } from "next/router";

export default function MyMatch() {
  const router = useRouter();

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  });

  const qs = { ...router.query };

  useEffect(() => {
    console.log(location.search);
    fetch(`${MY_MATCH_LIST}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj);
      });
  }, [router.query]);
  return !data.rows ? (
    <div>loading ...</div>
  ) : (
    <>
      <div className="row d-flex justify-content-between ">
        <div className="col">
          <h1>我的揪團</h1>
        </div>
        <div className="col">
          <div className="row">
            <div className="col-auto ms-auto">
              <button type="button" className="btn btn-light active">
                桌遊
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-light">
                密室
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="row m-2 "
        style={{
          background: "#ff860066",
          boxShadow: "inset 1px 1px 1px #0003",
          borderRadius: "10px",
        }}
      >
        <div className="col">
          {data &&
            data.rows.map((item, i) => {
              return <MyMatchList item={item} key={item.md_id} />;
            })}
        </div>
      </div>

      <style>{`
      .btn.active{
        background-color: #f97733;
        border:none;
        color:#fec;
        
      }`}</style>
    </>
  );
}

MyMatch.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
