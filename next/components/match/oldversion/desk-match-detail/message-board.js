import React from 'react'

export default function MatchMessage() {
  return (
    <>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">
              <i className="fa-regular fa-comment" />
            </div>
            <div className="col-auto">
              <span>留言板</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">用戶1</div>
            <div className="col-10">
              <span>你們可以接受從頭到尾尖叫然後甚麼事都不做的隊員嗎?</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">用戶2</div>
            <div className="col-10">
              <span>大家快來加入啊啊啊啊啊</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">用戶2</div>
            <div className="col-10">
              <span>大家快來加入啊啊啊啊啊</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">用戶2</div>
            <div className="col-10">
              <span>大家快來加入啊啊啊啊啊</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">用戶2</div>
            <div className="col-10">
              <span>大家快來加入啊啊啊啊啊</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">用戶2</div>
            <div className="col-10">
              <span>大家快來加入啊啊啊啊啊</span>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2">用戶2</div>
            <div className="col-10">
              <span>大家快來加入啊啊啊啊啊</span>
            </div>
          </div>
        </li>
        <li className="list-group-item text-end">
          <a className="btn btn-primary" type="button" id="">
            留言 <i className="fa-solid fa-pen" />
          </a>
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
