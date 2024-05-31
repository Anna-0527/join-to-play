import React from "react";
import TrProduct from "@/components/member/tr-product";

import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";

export default function TrProductPage() {
  const router = useRouter();
  return (
    <>
      <TrProduct />
    </>
  );
}
TrProductPage.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
