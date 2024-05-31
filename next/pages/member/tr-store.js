import React from "react";
import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";
import TrStore from "@/components/member/tr-store";

export default function TrStorePage() {
  const router = useRouter();
  return (
    <>
      <TrStore />
    </>
  );
}
TrStorePage.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
