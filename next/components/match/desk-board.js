import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function DeskBoard({ item }) {
  return (
    <>
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
            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option defaultValue>選擇鄉鎮市</option>
                <option value={1}>行政區1</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link href={'/match/create-desk'} className="btn btn-dark">
                +創建新團
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* 揪團列表 */}

      <div className="row">
        <div className="desk-board-card col-sm-12 bg-light my-3">
          <div className=" row position-relative p-3">
            <div className="col-3 my-auto">
              <Image
                src="/images/match/circle-chess.png"
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
                <div>
                  時間:{item.booking_date}
                  {item.booking_time}
                </div>
                <div>主揪:阿成</div>
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
        }
      `}</style>
    </>
  )
}
