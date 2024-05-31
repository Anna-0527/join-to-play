import React from "react";
import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";
import OrderList from "@/components/member/order-list";

export default function OrderListPage() {
  const router = useRouter();
  return (
    <>
      <OrderList />
    </>
  );
}
OrderListPage.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
