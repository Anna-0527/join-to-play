import LineLogo from "@/components/icons/line-logo";
import IgLogo from "@/components/icons/IG-logo";
import FacebookLogo from "@/components/icons/facebook-logo";
import Image from 'next/image'

export default function MyFooter() {
  return (
    <>
      <footer className="py-3 mt-auto">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-4 mb-3">
              <div className="footerLogo d-flex">
                <Image
                  src="/images/icon/team-logo.png"
                  alt=""
                  width={280} 
                  height={150} 
                  priority
                />
              </div>
            </div>
            <div className="col-md-2 mb-3 ">
              <h5 className="fw-semibold text-center mt-3">追蹤我們</h5>
              <ul className="list-unstyled d-flex">
                <li className="mx-3">
                  <a className="link-dark" href="#">
                    <FacebookLogo className="" />
                  </a>
                </li>
                <li className="mx-3">
                  <a className="link-dark" href="#">
                    <LineLogo className="" />
                  </a>
                </li>
                <li className="mx-3">
                  <a className="link-dark" href="#">
                    <IgLogo className="" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-4 d-flex mt-3">
              <div className="col-md-3 mb-3 me-5">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="FAQ-1.html" className="nav-link p-0 text-muted">
                      -關於我們
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="FAQ-1.html" className="nav-link p-0 text-muted">
                      -常見問題
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a
                      href="/proj/contact-us.html"
                      className="nav-link p-0 text-muted"
                    >
                      -聯絡客服
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 mb-3 me-5">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      -揪團說明
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      -預約說明
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      -媒合說明
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      -商業合作
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 mb-3">
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      -免責聲明
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      -使用權條款
                    </a>
                  </li>
                  <li className="nav-item mb-2">
                    <a href="#" className="nav-link p-0 text-muted">
                      -隱私權保護政策
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between pt-4 mt-4 border-top">
            <p className="foot">© 2024 Company, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <style jsx>
        {`
          /* footer區域 start*/
          footer .nav-link {
            color: #000 !important;
            letter-spacing: 1px;
          }
          footer .nav-link:hover {
            color: #ffffff !important;
          }
          .footerLogo p {
            letter-spacing: 1px;
            position: relative;
          }
          .footerLogo p::before {
            content: "|";
            position: absolute;
            width: 3px;
            background-color: #000;
            left: -5px;
            margin: 0 0;
            box-sizing: border-box;
            height: 40px;
          }

          /* footer區域 end*/
        `}
      </style>
    </>
  );
}
