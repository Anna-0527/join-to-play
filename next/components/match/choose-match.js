import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ChooseMatch() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* <h2 class="pt-4 ps-4">現在就加入！</h2> */}
            <div className="row">
              <div className="col p-3">
                <div className="row justify-content-evenly">
                  <div className="col-3 text-center circle-pics">
                    <a href="/escape-room">
                      <div className="pic-box">
                        <Image
                          src="/images/match/circle-run-man.png"
                          width={200}
                          height={200}
                          alt=""
                        />
                      </div>
                      <h4 className="p-2">密室逃脫</h4>
                    </a>
                  </div>
                  <div className="col-3 text-center circle-pics">
                    <Link href="/match/desk">
                      <div className="pic-box">
                        <Image
                          src="/images/match/circle-chess.png"
                          width={200}
                          height={200}
                          alt=""
                        />
                      </div>
                      <h4 className="p-2">桌遊媒合</h4>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .circle-pics h4 {
            color: #666;
            font-weight: 600;
            text-decoration: none;
          }

          .pic-box {
            width: 100%;
            transition: all 0.8s ease-in-out;
          }

          .pic-box:hover {
            transform: rotateY(180deg);
          }

          .pic-box img {
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
