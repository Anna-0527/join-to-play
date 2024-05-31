import React, {  useState } from "react";
import MatchLayout from "@/components/layout/match-layout";
import { useEffect } from "react";
import Link from "next/link";
import MatchDeskCard from "@/components/match/desk/md_card";
import AlmostMatch from "@/components/match/almost-match";
import { MATCH_LIST } from "@/components/config";

import { useRouter } from "next/router";



export default function DeskMatch() {
  const router = useRouter()

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
    deskRows:[],
  });

  const qs = { ...router.query };

  useEffect(() => {
    console.log(location.search);
    fetch(`${MATCH_LIST}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj);
      });
  }, [router.query]);

  return (
    <>
    <AlmostMatch/>
      <div className="container">
        <div className="row d-wrap">
          <div className="col-sm-12 col-md-12 col-lg-8">
            <div className="container-fluid">
              <h2 className="pt-4 ps-4" id="desk-board">
                桌遊媒合
              </h2>
            </div>
            <div className="container">
              <div className="row ">
                <div className="col  d-flex justify-content-between">
                  <div className="row mb-3">
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={``}
                      >
                        <option defaultValue>選擇地區</option>
                        <option value={1}>北部</option>
                        <option value={2}>南部</option>
                        <option value={3}>中部</option>
                        <option value={4}>東部</option>
                        <option value={5}>離島</option>
                      </select>
                    </div>
                    {/* <div className="col">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option defaultValue>選擇鄉鎮市</option>
                        <option value={1}>行政區1</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                      </select>
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="col">
                      <Link
                        href={"/match/desk/add"}
                        className="btn btn-dark"
                      >
                        +創建新團
                      </Link>
                    </div>
                  </div>
                  <div className="row"></div>
                </div>
              </div>
              {data &&
                data.rows.map((item) => {
                  return <MatchDeskCard item={item} key={item.md_id} />;
                })}
            </div>
          </div>
        </div>

        <div className="row">
            <div className="col-6">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {Array(11)
                    .fill(1)
                    .map((v, i) => {
                      const p = data.page - 5 + i;
                      if (p < 1 || p > data.totalPages) return null;
                      const active = p === data.page ? "active" : "";
                      const usp = new URLSearchParams({ ...qs, page: p });
                      return (
                        <li className={`page-item ${active}`} key={p}>
                          <Link className="page-link" href={`?${usp}`}>
                            {p}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </nav>
            </div>
            <div className="col-6">
              {/* <form className="d-flex" role="search" onSubmit={onSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="keyword"
                  defaultValue={router.query.keyword}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form> */}
            </div>
          </div>
      </div>
    </>
  );
}


