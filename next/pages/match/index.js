import React from "react";
import MatchLayout from "@/components/layout/match-layout";
import UpperBlock from "@/components/match/upper-block";
import AlmostMatch from "@/components/match/almost-match";
import ChooseMatch from "@/components/match/choose-match";
import DeskBoard from "@/components/match/desk-board";
import EscapeRoom from "@/components/match/escape-room";
import BackToTopButton from "@/components/match/BackToTopButton";
import DetailAndMessage from "@/components/match/match-detail-message";
import Link from "next/link";
import MatchDeskCard from "@/components/match/desk/md_card";

//
import { useEffect, useState } from "react";

// import { MATCH_LIST } from '@/components/config'
import { useRouter } from "next/router";

export default function MatchIndex() {
  const router = useRouter();

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  });
  useEffect(() => {
    fetch(`http://localhost:3001/match/api`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj);
      });
  }, []);

  return (
    <>

      <div
        className="container-fluid"
        style={{
          background: "#fff9",
          boxShadow: "inset 0px 0px 5px  #0004",
        }}
      >
        <h2 className="pt-4 ps-4" id="desk-board">
          即將成團
        </h2>
        <AlmostMatch />
      </div>
      <div className="container">
        <div className="row d-wrap">
          <div className="col-sm-12 col-md-6 col-lg-8">
            <div className="container-fluid">
              <h2 className="pt-4 ps-4" id="desk-board">
                桌遊媒合
              </h2>
            </div>
            <div className="container">
              <div className="row ">
                <div className="col-sm-12  d-flex justify-content-between">
                  <div className="row mb-3">
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option defaultValue>選擇縣市</option>
                        <option value={1}>高雄市</option>
                        <option value={2}>台北市</option>
                        <option value={3}>台中市</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Link
                        href={"/match/create-desk"}
                        className="btn btn-dark"
                      >
                        +創建新團
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {data &&
                data.rows.map((item) => {
                  return <MatchDeskCard item={item} key={item.id} />;
                })}
            </div>
            <div className="container-fluid">
              <h2 className="pt-4 ps-4" id="escape-room">
                密室逃脫媒合
              </h2>
            </div>
            <div className="container">
              <EscapeRoom />
            </div>
          </div>
          <div
            className="col-sm-12 col-md-6 col-lg-4 flex-shrink-1"
            style={{ marginTop: "70px" }}
          >
            {/* <DetailAndMessage /> */}
          </div>
        </div>
      </div>
      <BackToTopButton />
    </>
  );
}

MatchIndex.getLayout = function (page) {
  return <MatchLayout>{page}</MatchLayout>;
};
