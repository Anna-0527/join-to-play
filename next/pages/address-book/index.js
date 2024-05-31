import Head from "next/head";
import Layout1 from "@/components/common/Layout1";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AB_LIST, AB_ITEM_DELETE, JWT_TOGGLE_LIKE } from "@/components/config";
import { FaTrash, FaFilePen, FaRegHeart, FaHeart } from "react-icons/fa6";
import ThemeContext, { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/auth-context";

export default function AbList() {
  const router = useRouter();
  const { theme } = useTheme();
  const { auth, getAuthHeader } = useAuth();

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: []
  });

  useEffect(() => {
    fetch(`${AB_LIST}${location.search}`, {
      headers: { ...getAuthHeader() },
    })
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj);
      });
  }, [router.query, auth]);

  const deleteItem = (sid) => {
    if (confirm(`確定要刪除編號為 ${sid} 的資料嗎?`)) {
      fetch(`${AB_ITEM_DELETE}/${sid}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then((result) => {
          console.log(result);
          // router.reload(); // 會刷頁面
          router.push(location.search);
        });
    }
  };
  const onSearch = (e) => {
    e.preventDefault();
    let keyword = e.currentTarget.keyword?.value;
    keyword = keyword.trim(); // 去掉頭尾空白
    if (keyword) {
      router.push(`?keyword=${keyword}`);
    } else {
      router.push(`?`);
    }
  };

  const toggleLike = async (product_sid) => {
    const r = await fetch(`${JWT_TOGGLE_LIKE}/${product_sid}`, {
      headers: { ...getAuthHeader() },
    });
    const result = await r.json();
    if (result.success) {
      // "action": "remove", "add"
      setData((old) => {
        const newRows = old.rows.map((v) => {
          if (v.sid === product_sid) {
            const like_sid = result.action === "add" ? 1 : null;
            return { ...v, like_sid };
          } else {
            return { ...v };
          }
        });
        return { ...old, rows: newRows };
      });
    }
  };
  // console.log(router);

  // 取得 query string 的資料
  const qs = { ...router.query };
  return (
    <Layout1 pageName="ab-list">
      <Head>
        <title>通訊錄列表</title>
      </Head>
      {!data.rows ? (
        <div>loading ...</div>
      ) : (
        <>
          <div className="row">
            <div className="col-6">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {Array(11)
                    .fill(1)
                    .map((v, i) => {
                      const p = data.page - 5 + i;
                      if (p < 1 || p > data.totalPages) return null;
                      const active = p === data.page ? "active" : "";
                      const usp = new URLSearchParams({ ...qs, page: p });
                      return (
                        <li className={`page-item ${active}`} key={p}>
                          <Link className="page-link" href={`?${usp}`}>
                            {p}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </nav>
            </div>
            <div className="col-6">
              <form className="d-flex" role="search" onSubmit={onSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="keyword"
                  defaultValue={router.query.keyword}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>
                      <FaTrash />
                    </th>
                    <th>#</th>
                    <th>姓名</th>
                    <th>電郵</th>
                    <th>手機</th>
                    <th>生日</th>
                    <th>地址</th>
                    <th>
                      <FaFilePen />
                    </th>
                  </tr>
                  {/* */}
                </thead>
                <tbody>
                  {data.rows.map((v) => {
                    return (
                      <tr key={v.sid}>
                        <td>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault(); // 不跳頁
                              deleteItem(v.sid);
                            }}
                          >
                            <FaTrash />
                          </a>
                        </td>
                        <td style={theme}>
                          {v.sid} {` `}
                          <span onClick={(e) => toggleLike(v.sid)}>
                            {v.like_sid ? <FaHeart /> : <FaRegHeart />}
                          </span>
                        </td>
                        <td style={theme}>{v.name}</td>
                        <td>{v.email}</td>
                        <td>{v.mobile}</td>
                        <td>{v.birthday}</td>
                        <td>{v.address}</td>
                        <td>
                          <Link href={`/address-book/edit/${v.sid}`}>
                            <FaFilePen />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {/*
      <pre>{JSON.stringify(data, null, 4)}</pre>
       */}
    </Layout1>
  );
}
