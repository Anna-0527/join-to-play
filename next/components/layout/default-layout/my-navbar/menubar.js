import Link from "next/link";
import styles from "./menubar.module.scss";

// 說明:
// 選單客製化以靜態方式、移至config檔案或寫死(hard code)來產生是常見
// 選單項目定義在這裡，下面元件程式碼會自動產生對應的dom
// id是作key用的，不重覆即可
// 有下拉的選單需要加一個children的陣列屬性
const menuItems = [
  {
    id: 1,
    label: "首頁",
    href: "/",
  },
  {
    id: 2,
    label: "商品",
    href: "/product",
    children: [{ id: 41, label: "桌上遊戲", href: "/product/list" }],
  },
  {
    id: 3,
    label: "線上預約",
    href: "/booking",
    children: [
      { id: 51, label: "密室逃脫", href: "/booking/booking-es1" },
      { id: 52, label: "桌遊", href: "/booking/booking-de1" },
    ],
  },
  {
    id: 5,
    label: "快速媒合",
    href: "/match",
    children: [
      { id: 60, label: "桌遊媒合", href: "/match/desk" },
      { id: 61, label: "我的揪團", href: "/match/my-match" },
    ],
  },
];

export default function MainMenu({ currentRoute = "/" }) {
  return (
    <>
      <ul className="navbar-nav flex-grow-1 ps-lg-5 ps-xs-0 mx-auto d-flex justify-content-end">
        {menuItems.map((v) => {
          // 用children判斷是否有下拉選單
          if (!v.children) {
            return (
              <li className="nav-item" key={v.id}>
                <Link
                  className={`nav-link ${
                    currentRoute === v.href
                      ? "active " + styles["custom-active"]
                      : ""
                  }`}
                  aria-current="page"
                  href={v.href}
                >
                  {v.label}
                </Link>
              </li>
            );
          }

          // 以下為有dropmenu(下拉選單)的選單項目的jsx
          return (
            <li
              className={`nav-item dropdown ${styles["dropdown"]}`}
              key={v.id}
            >
              <Link
                // 尋找是否有符合 currentRoute 的 children href
                className={`nav-link dropdown-toggle ${
                  v.children.find((v) => v.href === currentRoute)
                    ? "active " + styles["custom-active"]
                    : ""
                }`}
                href={v.href}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {v.label}
              </Link>
              <ul
                className={`dropdown-menu ${styles["slideIn"]} ${styles["dropdown-menu"]}`}
              >
                {v.children.map((v2) => {
                  return (
                    <li key={v2.id}>
                      <Link
                        className={`dropdown-item ${
                          currentRoute === v2.href ? "active" : ""
                        }`}
                        href={v2.href}
                      >
                        {v2.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}
