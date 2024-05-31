import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import MemberLayout from "@/components/layout/member-layout";
import { useAuth } from "@/contexts/auth-context";
import BookingRecordEditC from "@/components/booking/booking-record-edit";
import { useRouter } from "next/router";

export default function BookingRecordEdit() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.sid} 更改預約紀錄</title>
      </Head>
      <BookingRecordEditC sid={router.query.sid} />
    </>
  );
}

BookingRecordEdit.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
