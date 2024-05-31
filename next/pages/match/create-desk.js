import React from 'react'
import Link from 'next/link'

export default function CreateDesk() {
  const sendData = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-10 col-lg-6 my-5 mx-auto">
          <form className="create-match" action="">
            {/* <h3>創建新團</h3> */}
            <div className="card my-5 ">
              <div className="card-header pt-4 pb-3 text-center">
                填寫表單，發起揪團～
              </div>
              <div className="card-body text-secondary p-5">
                <div className="row">
                  <div className="mb-2 col-sm-12 col-md-2 ">揪團類型</div>
                  <div className="col-5 mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        //記得要設定值
                        value={''}
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        桌遊
                      </label>
                    </div>
                  </div>
                  <div className="col-5 mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        disabled
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        密室逃脫
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto ">選擇店家</div>
                  <div className="col-sm-6 col-md-5 py-3 ">
                    <select
                      className="form-select rounded-0"
                      aria-label="Default select example"
                    >
                      <option selected="">選擇縣市</option>
                      <option value={1}>高雄市</option>
                      <option value={2}>台北市</option>
                      <option value={3}>台中市</option>
                    </select>
                  </div>
                  
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="matchShop">選擇店家</label>
                  </div>
                  <div className="col-sm-12 col-md-10    py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected="">選擇店家</option>
                      <option value={1}>行政區1</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="choose-escape-game">選擇遊戲</label>
                  </div>
                  <div className="col-sm-12 col-md-10   py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected="">密室逃脫遊戲</option>
                      <option value={1}>遊戲名1</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="matchTime">選擇日期</label>
                  </div>
                  <div className="col-sm-12 col-md-10   py-3 ">
                    <input type="date" id="matchTime" name="matchTime" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto ">
                    <label htmlFor="matchTime">選擇時段</label>
                  </div>
                  <div className="col-sm-12 col-md-10    py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option defaultValue>選擇時段</option>
                      <option value={1}>10:00~14:00</option>
                      <option value={2}>12:00~17:00</option>
                      <option value={3}>包全天</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto ">
                    <label htmlFor="desk-game-solution">桌遊方案</label>
                  </div>
                  <div className="col-sm-12 col-md-10    py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option defaultValue>桌遊方案</option>
                      <option value={1}>方案1</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto ">
                    <label htmlFor="max-players">人數上限</label>
                  </div>
                  <div className="col-sm-12 col-md-10    py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected="">選擇人數</option>
                      <option value={1}>4</option>
                      <option value={2}>5</option>
                      <option value={3}>6</option>
                      <option value={4}>7</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col text-center pt-4 my-auto">
                    <Link
                      href={'/match'}
                      className="btn btn-secondary"
                      style={{ background: '#ffaf63', border: 'none' }}
                    >
                      回前頁
                    </Link>
                  </div>
                  <div className="col text-center pt-4 my-auto">
                    <button
                      type="submit"
                      className="btn btn-dark"
                      onClick={sendData}
                    >
                      送出
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .create-match .card {
          border: none;
          box-shadow: 0px 0px 3px #0001;
        }
        .create-match .card-header {
          background: #ffaf63;
        }
        
      `}</style>
    </>
  )
}
