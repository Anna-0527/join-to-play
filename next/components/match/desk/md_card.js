import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function MatchDeskCard({ item }) {
  return (
    <>
      <div key={item.md_id} className="row">
        <div className={`col-sm-12 my-3 ${item.current_count == item.player_count ?"desk-board-card-full" :"desk-board-card" }`}>
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
              <h5 className="mt-0 fw-bolder"> {item.match_name}</h5>
              <div>
                <div>
                  當前 {item.current_count} 人 / 上限 {item.player_count} 人
                </div>
                <div>日期: {item.booking_date}</div>
                <div>時段:  {item.booking_time}</div>
              </div>
              <Link
                // TODO
                href={`/match/desk/detail/${item.md_id}`}
                className="stretched-link"
              >
                地址：{item.store_address}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .desk-board-card {
          border-radius:10px;
          box-shadow: 1px 1px 1px 0px #0002;
          background-color:#fffa;
          transition:all 0.5s;
        }
       
        .desk-board-card:hover {
          background-color: #fb7a;
          box-shadow:inset 1px 1px 1px 0px #c805;
        }

        .desk-board-card-full {
          border-radius:10px;
          box-shadow: 0px 0px 5px  #af09;
          background-color:#ad6a;
          transition:all 0.5s;
        }
        .desk-board-card-full:hover {
          background-color: #ad6a;
          box-shadow:inset 0px 0px 1px 0px #0003;
        }

      `}</style>
    </>
  );
}
