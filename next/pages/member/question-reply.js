import React from "react";
import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";
import QuestionReply from "@/components/member/question-reply";

export default function QuestionReplyPage() {
  const router = useRouter();
  return (
    <>
      <QuestionReply />
    </>
  );
}
QuestionReplyPage.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
