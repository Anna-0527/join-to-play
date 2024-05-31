import React from 'react'

export default function MessageBoard() {
  return (
    <>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">
              <i className="bi bi-shop" />
            </div>
            <div className="col-auto">
              <span>戰慄空間</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">
              <i className="bi bi-geo-alt-fill" />
            </div>
            <div className="col-auto">
              <span>台北市中山區明亮路5號</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">
              <i className="bi bi-calendar-check" />
            </div>
            <div className="col-auto">
              <span>2024/4/10</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">時段</div>
            <div className="col-auto">
              <span>13:00~18:00</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">人數</div>
            <div className="col-auto">
              <span>3 (上限：4人)</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">團主</div>
            <div className="col-auto">
              <span>王小馬</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">團員</div>
            <div className="col-auto">
              <span>莉莉夫人</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">團員</div>
            <div className="col-auto">
              <span>亞洲富豪</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">備註</div>
            <div className="col-auto">
              <span>當天需要配戴黃色的飾品</span>
            </div>
          </div>
        </li>
        <li className="list-group-item text-end">
          <button className="btn btn-primary" type="button" id="">
            立即加入
          </button>
        </li>
      </ul>
      <style jsx>
        {`
          ul {
            border-radius: 10px;
          }
        `}
      </style>
    </>
  )
}
