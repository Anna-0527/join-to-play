import React from 'react'
import Carousel from '@/components/product/carousel'
import Image from 'next/image'

export default function Detail() {
  return (
    <>
      <div className="row mt-5 mx-2">
        <div className="col-sm-7">
          <div className="position-sticky" style={{ top: '2rem' }}>
            <Carousel />
          </div>
        </div>
        <div className="col-sm-5">
          <h4>動物農場</h4>
          <strong style={{ top: '2rem' }}>NT$390</strong>
          <p className="product-desc">
            經營一個動物農場可不容易，要幫牛、豬和雞收集各自喜歡的食物，還要找出他們配對後相乘的積的最高價值，才能讓自己的農場獲得最大收益。
          </p>

          <button className="btn btn-primary w-100 mb-3">加入購物車</button>
        </div>
      </div>
      <div className="row mt-5 mx-2">
        <div className="col-sm-12">
          <h2 className="text-center mt-4">▍遊戲資訊</h2>
          <p className="text-center mb-5 fs-4">
            遊戲人數：2-4人 遊戲時間：25-30分鐘 適合年齡：8+
          </p>
          <h2 className="text-center mt-4">▍配件內容</h2>
          <p className="text-center mb-5 fs-4">
            農場牌 x 104（動物牌 x 48、食物牌 x 56） 收入提示牌 x 4 市場圖板 x 1
            玩家標記 x 24
          </p>
          <Image
            src="/images/product/slide/edu5-3.webp"
            width={1200}
            height={800}
            priority
            alt="..."
          />
          <h2 className="text-center mt-5">▍規則簡介</h2>
          <p className="text-center mt-4 font-weight-light fs-4">
            玩家輪流行動，輪到自己時依序進行採購與出貨，做完動作後將翻開的農場牌補到6張。
          </p>
          <h5 className="text-center mt-3">【採購】</h5>
          <p className="text-center mt-2 font-weight-light">
            依照收入提示牌上標記的金幣數量拿取農場牌。
            紅色的牛和牧草是一組，粉色的豬和水果是一組，綠色的雞和小蟲是一組。每位玩家面前只能有2組牌。
            飼料可以做為任一種食物。
          </p>
          <h5 className="text-center mt-3">【出貨】</h5>
          <p className="text-center mt-2 font-weight-light">
            玩家可選擇一組牌出貨，也可以不出貨。
            將動物總數乘以食物總數，即為這組牌的價值點數。
            根據這組牌的價值點數，將自己的玩家標記放在市場圖板上符合的空格中，並獲得該格的分數。
            如果放置的空格上有金幣，則玩家可以提升提示牌的收入。
          </p>
          <Image
            src="/images/product/slide/edu5-2.webp"
            width={1200}
            height={800}
            priority
            alt="..."
          />

          <h5 className="text-center mt-3">【遊戲結束】</h5>
          <p className="text-center mt-2 font-weight-light">
            每位玩家都動作一次算做一輪，一輪結束時，如果有玩家已經放了5個標記在市場圖板上，則遊戲結束。最高分的玩家獲勝。
          </p>
        </div>
      </div>
    </>
  )
}
