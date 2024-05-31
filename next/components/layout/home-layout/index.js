import React, { Children } from "react";
import HomeCarousel from "@/components/homepage/homecarousel";
import MyNavbar from "../default-layout/my-navbar";

import { useLoader } from '@/hooks/use-loader'




export default function Homepage({ children }) {

  const { loader } = useLoader()


  return (
    <>
      <MyNavbar />
      <div className=" mt-3">
        <HomeCarousel />
      </div>

      <div className="container">
        <main className="">{children}</main>
    {loader()}
        
      </div>
    </>
  );
}
