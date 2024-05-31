import { useTheme, themes } from "@/contexts/theme-context";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export default function Navbar({ pageName = "" }) {
  const { auth, logout } = useAuth();
  const myStyle = {
    borderRadius: "6px",
    backgroundColor: "blue",
    color: "white",
    fontWeight: 800,
  };

  const { theme, setTheme } = useTheme();

  const toggleTheme = (e) => {
    e.preventDefault();
    setTheme(theme.name === "dark" ? themes.light : themes.dark);
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Home
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/address-book"
                  style={pageName === "ab-list" ? myStyle : {}}
                >
                  通訊錄列表
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/address-book/add"
                  style={pageName === "ab-add" ? myStyle : {}}
                >
                  新增通訊錄
                </Link>
              </li>
              <li className="nav-item">
                {theme.name === "dark" ? (
                  <a
                    className="nav-link"
                    href="#"
                    style={{ ...themes.light, border: "1px solid gray" }}
                    onClick={toggleTheme}
                  >
                    theme
                  </a>
                ) : (
                  <a
                    className="nav-link"
                    href="#"
                    style={{ ...themes.dark, border: "1px solid gray" }}
                    onClick={toggleTheme}
                  >
                    theme
                  </a>
                )}
              </li>
            </ul>

            <ul className="navbar-nav mb-2 mb-lg-0">
              {auth.id ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link">{auth.nickname}</a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    >
                      登出
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="/login"
                      style={pageName === "login" ? myStyle : {}}
                    >
                      登入
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
