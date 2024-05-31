import Head from "next/head";
import Layout1 from "@/components/common/Layout1";
import DeskBoard1 from "@/components/match/desk-board_1";
import MatchDeskCard from "@/components/match/match_desk_card";

import { useEffect, useState } from "react";
export default function AbList() {
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
  console.log(data);
  return (
    <>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      {/* <MatchCard item={data}/> */}
      <div className="container">
        <div className="row">
          {data &&
            data.rows.map((item) => {
                
              return <MatchDeskCard item={item} key={item.id} />;
            })}
        </div>
      </div>
    </>
  );
}
