import React from "react";
import EditForm from "@/components/member/edit-form";
import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";

export default function Edit() {
  const router = useRouter();
  return (
    <>
      <EditForm id={router.query.id} />
    </>
  );
}

Edit.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
