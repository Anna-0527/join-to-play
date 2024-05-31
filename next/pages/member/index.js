import React from "react";
// import Sidebar from "@/components/layout/member-layout/sidebar";
import MemberAccount from "@/components/member/account";
import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";

export default function AccountPage() {
  const router = useRouter();
  return (
    <>
      <MemberAccount />
      {/* id={router.query.id}  */}
    </>
  );
}
AccountPage.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
