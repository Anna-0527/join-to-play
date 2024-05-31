import React from "react";
import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";
import BookingList from "@/components/member/booking-list";

export default function BookingListPage() {
  const router = useRouter();
  return (
    <>
      <BookingList />
    </>
  );
}
BookingListPage.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
