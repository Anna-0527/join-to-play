import React from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MY_MATCH_LIST } from "@/components/config";
import { useAuth } from "@/contexts/auth-context";

export default function MyMatchList({ item }) {
  const router = useRouter();
  return (
    <>
      <div
        key={item?.md_id}
        onClick={() => {
          router.push(`/match/my-match/detail/${item.md_id}`);
        }}
        className={`row  m-4  ${
          item.current_count == item.player_count ? "match-list-confirmed" : "match-list"
        } `}
      >
        <div className="col  py-3 px-3">
          <div className="row">
            <div className="col-3  my-auto ms-2">
              <Image
                src="/images/match/desk-circle.png"
                width={80}
                height={80}
                alt="..."
              />
            </div>
            <div className="col-auto ms-5">
              <h5 className="fw-bold">{item?.match_name}</h5>
              <div>
                <div>日期：{item?.booking_date}</div>
                <div>時間：{item?.booking_time}</div>
                {/* <div>人數：2/4</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .match-list {
          border-radius: 20px;
          background: #fff;
          box-shadow: 1px 1px 1px #0002;
          transition: all 0.5s;
          padding: 10px;
        }
        .match-list:hover {
          background: #ffddaa;
          cursor: pointer;
          box-shadow: inset 1px 1px 1px #dd660099;
        }
        .match-list-confirmed {
          border-radius: 20px;
          background-color: #df6a;
          box-shadow: 1px 1px 1px #0002;
          transition: all 0.5s;
          padding: 10px;
        }
        .match-list-confirmed:hover {
          background-color: #ad5a;
          cursor: pointer;
          box-shadow: inset 1px 1px 1px #dd660099;
        }
      `}</style>
    </>
  );
}
