import MemberNavbar from "./member-navbar";
import MyFooter from "./my-footer";
import Head from "next/head";
import Sidebar from "./sidebar";
import NextBreadCrumb from "@/components/common/next-breadcrumb";
import styles from "./member.module.css";

import { useLoader } from '@/hooks/use-loader'

export default function MemberLayout({ title = "", children }) {
  const { loader } = useLoader()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MemberNavbar />
      <div className={`container ${styles["member-page"]} `}>
        <NextBreadCrumb isHomeIcon isChevron bgClass="" />
        <div className="container d-flex  ">
          <Sidebar />
          <main>
            <div className={`${styles["component"]}`}>{children}</div>
            {loader()}

          </main>
        </div>
      </div>
      <MyFooter />
    </>
  );
}
