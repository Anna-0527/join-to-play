import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import BookingRecordC from "@/components/booking/booking-record-c";
import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";
import { useAuth } from "@/contexts/auth-context";

export default function BookingRecord() {
  const router = useRouter();
  const { auth } = useAuth();
  console.log(auth);

  return (
    <>
      <Head>
        <title>預約紀錄</title>
      </Head>
      <BookingRecordC sid={auth.id} />
    </>
  );
}

BookingRecord.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
