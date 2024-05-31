import React from "react";

export default function UpperBlock() {
  return (
    <>
      <div className="container-fluid">
        <div className="row mb-3" id="matchIntro">
          <div className="col my-auto text-end">
            <h1>快速媒合</h1>
            <h3>不用等人約，立即加入現成揪團！</h3>
          </div>
        </div>
      </div>
      <style jsx>{`
        #matchIntro {
          background: 30% 80% / cover no-repeat
            url("/images/match/waiting2.png");
          height: 60vh;
          background-color: #0003;
        }
        #matchIntro h1 {
          width: 100%;
          color: #eee;
          font-size: 72pt;
          font-weight: bold;
        }
        #matchIntro h1:hover {
          color: #1973c3aa;
          transition: 0.3s;
        }
        #matchIntro h3 {
          font-size: 36pt;
          color: white;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
}
