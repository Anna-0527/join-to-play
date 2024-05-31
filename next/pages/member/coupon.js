import React from 'react'
import { useRouter } from "next/router";
import MemberLayout from "@/components/layout/member-layout";
import Coupon from '@/components/member/coupon';

export default function CouponPage() {
  const router = useRouter();
  return (<>
    <Coupon />
  </>)
}
CouponPage.getLayout = function (page) {
  return <MemberLayout>{page}</MemberLayout>;
};
