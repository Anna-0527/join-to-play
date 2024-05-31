import React from "react";
import Image from "next/image";

export default function MatchDeskCard({ item }) {
  return (
    <>
      <div className="row">
        <div className="desk-board-card col-sm-12 my-3">
          <div className=" row position-relative p-3">
            <div className="col-3 my-auto">
              <Image
                src={`/images/match/${item.store_type}-circle.png`}
                width={100}
                height={100}
                className="flex-shrink-0 me-3"
                alt="..."
              />
            </div>
            <div className="col">
              <h5 className="mt-0"> {item.match_name}</h5>
              <div>
                <div>
                  人數: {item.current_count}/{item.player_count}
                </div>
                <div>日期:{item.booking_date}</div>
                <div>時段: {item.booking_time}</div>
              </div>
              <a
                // TODO
                href="#"
                className="stretched-link"
              >
                查看詳細資訊
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .desk-board-card {
          border-radius: 10px;
          box-shadow: 1px 1px 3px #0004;
          background-color:#fff9;
          transition:all 0.5s;
        }
        .desk-board-card:hover {
          background-color: #fed9;
          box-shadow:0.5px 0.5px 1px #0004;
        }
      `}</style>
    </>
  );
}
