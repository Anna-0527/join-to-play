import Image from "next/image";
import Link from "next/link";
import styles from "./toolbar.module.scss";
import { useAuth } from "@/contexts/auth-context";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "@/hooks/use-cart";

export default function Toolbar() {
  const cartItems = useCart(0);
  const totalItems = cartItems !== null ? cartItems.length : 0;
  const { auth, logout } = useAuth();
  const myStyle = {
    borderRadius: "6px",
    backgroundColor: "blue",
    color: "white",
    fontWeight: 800,
  };

  return (
    <ul className="navbar-nav pe-2 ms-auto">
      <li
        // className="nav-item dropdown"
        className={`nav-item dropdown ${styles["dropdown"]}`}
      >
        <Link
          className="nav-link dropdown-toggle btn btn-hover-white"
          href="/member"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          title="會員中心"
        >
          <i className="bi bi-person-circle"></i>
          <p className="d-none d-md-inline d-lg-none">會員中心</p>
        </Link>
        <ul
          className={`dropdown-menu dropdown-menu-end p-4 mw-100 ${styles["slideIn"]} ${styles["dropdown-menu"]}`}
        >
          <li>
            <p className="text-center">
              <Image
                src="/avatar.svg"
                className="rounded-circle d-block mx-auto"
                alt="..."
                width={80}
                height={80}
              />
            </p>
            <p className="text-center">Hi~ {auth?.nickname}</p>
          </li>
          <li>
            <Link className="dropdown-item text-center" href="/member">
              會員管理區
            </Link>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>
          {auth.id ? (
            <>
              {/* <li className="nav-item">
                <Link className="nav-link">{auth.id}</Link>
              </li> */}
              <li className="nav-item">
                <Link 
                  className={`nav-link text-center ${styles['logout']} `}
                  href="/member/login"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                >
                  登出
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link text-center ${styles['logout']} `}
                  href="/member/login"
                  // style={pageName === "login" ? myStyle : {}}
                >
                  登入
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item text-center"
                  href="/member/register"
                >
                  註冊
                </Link>
              </li>
            </>
          )}
        </ul>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link  btn btn-hover-white"
          href="/cart"
          role="button"
          title="購物車"
        >
          <AiOutlineShoppingCart />
          <span className="cart-item-qty">{totalItems}</span>
        </Link>
      </li>
    </ul>
  );
}
