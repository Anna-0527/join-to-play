import React from "react";
import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";
import Contact from "@/components/member/contact";

export default function ContactPage() {
  const router = useRouter();
  return (
    <>
      <Contact />
    </>
  );
}
ContactPage.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
