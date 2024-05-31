import React, { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MyFooter from '@/components/layout/default-layout/my-footer'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { STORE_DESK } from "@/components/config";
import StoreCardDesk from '@/components/booking/StoreCard-desk'
import { useAuth } from "@/contexts/auth-context";

export default function BookingDE1() {

  const router = useRouter();

  const { auth, getAuthHeader } = useAuth();

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: []
  });

  useEffect(() => {
    fetch(`${STORE_DESK}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj);
      });
  }, []);

  // useEffect(() => {
  //   fetch(`${STORE_DESK}${location.search}`, {
  //     headers: { ...getAuthHeader() },
  //   })
  //     .then((r) => r.json())
  //     .then((dataObj) => {
  //       setData(dataObj);
  //     });
  // }, [router.query, auth]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="text-center mb-3 fw-bold">店家資訊</h2>
            {/* 排序 */}
            <div className="dropdown mb-3 d-flex justify-content-end dropdown-menu-end">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                店家排序
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a className="dropdown-header" href="#">
                    -- 排序條件 --
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    人氣最高
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    評論最多
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    評分最高
                  </a>
                </li>
              </ul>
            </div>

                <StoreCardDesk/>

          </div>
        </div>
      </div>
    </>
  )
}

