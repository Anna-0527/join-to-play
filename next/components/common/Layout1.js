import Navbar from "./Navbar";
import Head from "next/head";

export default function Layout1({children, pageName=""}) {
  return (
    <>
      <Head>
        <title>layout-1 測試</title>
      </Head>
      <Navbar pageName={pageName} />
      <div className="container">{children}</div>
      <div className="container">
        <div> my footer </div>
      </div>
    </>
  );
}
