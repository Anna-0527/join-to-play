import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MdEditForm from "@/components/match/desk/md_edit_form";

export default function EditDesk() {
  const router = useRouter();
  

  return (
    <>
      <Head>
        <title>{router.query.sid} 修改桌遊揪團資料</title>
      </Head>
<MdEditForm md_id={router.query.md_id}/>
    </>
  );
}
