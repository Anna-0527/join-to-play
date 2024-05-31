import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function EscapeRoom() {
  return (
    <>
      <div className="row ">
        <div className="col-sm-12 d-flex justify-content-between">
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
        <div className="escape-card col-sm-12 bg-light my-3">
          <div className="row position-relative p-3">
            <div className="col-3 my-auto">
              <Image
                src="/images/match/circle-run-man.png"
                width={100}
                height={100}
                className="flex-shrink-0 me-3"
                alt="..."
              />
            </div>
            <div className="col">
              <h5 className="mt-0">揪團名字</h5>
              <div>
                <div>人數: 2/4</div>
                <div>時間:2024/2/10 14:00-17:00</div>
                <div>主揪:阿成</div>
              </div>
              <a href="#" className="stretched-link">
                查看詳細資訊
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="escape-card col-sm-12 bg-light my-3">
          <div className="row position-relative p-3">
            <div className="col-3 my-auto">
              <Image
                src="/images/match/circle-run-man.png"
                width={100}
                height={100}
                className="flex-shrink-0 me-3"
                alt="..."
              />
            </div>
            <div className="col">
              <h5 className="mt-0">揪團名字</h5>
              <div>
                <div>人數: 2/4</div>
                <div>時間:2024/2/10 14:00-17:00</div>
                <div>主揪:阿成</div>
              </div>
              <a href="#" className="stretched-link">
                查看詳細資訊
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="escape-card col-sm-12 bg-light my-3">
          <div className="row position-relative p-3">
            <div className="col-3 my-auto">
              <Image
                src="/images/match/circle-run-man.png"
                width={100}
                height={100}
                className="flex-shrink-0 me-3"
                alt="..."
              />
            </div>
            <div className="col">
              <h5 className="mt-0">揪團名字</h5>
              <div>
                <div>人數: 2/4</div>
                <div>時間:2024/2/10 14:00-17:00</div>
                <div>主揪:阿成</div>
              </div>
              <a href="#" className="stretched-link">
                查看詳細資訊
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .escape-card {
          border-radius: 10px;
        }
      `}</style>
    </>
  )
}
