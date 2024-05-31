import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <nav className="navbar-model navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            <Image src="/logo.png" alt="" width={100} height={48} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" href="/">
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  線上預約
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/match">
                  快速媒合
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  全部商品
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-regular fa-circle-user" />
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="btn"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample"
                >
                  <i className="fa-solid fa-cart-shopping" id="iconCart" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <style jsx>{``}</style>
    </>
  );
}
