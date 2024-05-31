import { RiShoppingCartLine, RiCoupon2Line } from "react-icons/ri";
import { IoNewspaperOutline, IoStorefrontSharp } from "react-icons/io5";
import {
  FaBriefcase,
  FaFlagCheckered,
  FaRegCalendarCheck,
  FaStar,
} from "react-icons/fa6";
import { FaClipboardList, FaUser } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import styles from "./member.module.css";
import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      <div className="position-sticky" style={{ top: "2rem" }}>
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-bg-light"
          style={{ width: 200 }}
        >
          <div className={`${styles["sidebar-header"]}`}>
            <span className="fs-4">會員專區</span>
          </div>

          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link href="/cart" className={`nav-link ${styles["page-link"]} `}>
                <svg className="bi pe-none me-2" width="16" height="16">
                  <RiShoppingCartLine />
                </svg>
                購物車
              </Link>
            </li>
            <li>
              <Link
                href="/member/order-list"
                className={`nav-link ${styles["page-link"]} `}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <IoNewspaperOutline />
                </svg>
                訂單紀錄
              </Link>
            </li>
            {/* <li>
              <Link
                href="/member/tr-product"
                className={`nav-link ${styles["page-link"]} `}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <FaBriefcase />
                </svg>
                收藏商品
              </Link>
            </li> */}
            <li>
              <Link
                href="/match/my-match"
                className={`nav-link ${styles["page-link"]} `}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <FaFlagCheckered />
                </svg>
                我的揪團
              </Link>
            </li>
            <li>
              <Link
                href="/member/booking-record"
                className={`nav-link ${styles["page-link"]} `}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <FaRegCalendarCheck />
                </svg>
                預約紀錄
              </Link>
            </li>
            <li>
              <Link
                href="/member/tr-store"
                className={`nav-link ${styles["page-link"]} `}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <IoStorefrontSharp />
                </svg>
                收藏店家
              </Link>
            </li>
            <li>
              <Link
                href="/member/question-reply"
                className={`nav-link ${styles["page-link"]} `}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <FaClipboardList />
                </svg>
                問答紀錄
              </Link>
            </li>
            <li>
              <Link
                href="/member/contact"
                className={`nav-link ${styles["page-link"]} `}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <TfiWrite />
                </svg>
                聯絡客服
              </Link>
            </li>
            {/* <li>
              <Link href="#" className={`nav-link ${styles["page-link"]} `}>
                <svg className="bi pe-none me-2" width="16" height="16">
                  <RiCoupon2Line />
                </svg>
                優惠券
              </Link>
            </li>
            <li>
              <Link href="#" className={`nav-link ${styles["page-link"]} `}>
                <svg className="bi pe-none me-2" width="16" height="16">
                  <FaStar />
                </svg>
                我的點數
              </Link>
            </li> */}
            <li>
              <Link
                href="/member"
                className={`nav-link ${styles["page-link"]} `}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <FaUser />
                </svg>
                帳戶管理
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
