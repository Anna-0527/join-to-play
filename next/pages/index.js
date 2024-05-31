import { useRouter } from 'next/router'
import  {PRODUCT_S} from '@/components/config'
import Product from '@/components/product/product'
import React, { useState, useEffect } from 'react';
// import HomeCarousel from "@/components/homepage/homecarousel";
import Homepage from '@/components/layout/home-layout';


export default function Home() {
  const router = useRouter()

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: []
  });

  useEffect(() => {
    fetch(`${PRODUCT_S}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => {
      setData(dataObj);
      });
  }, []);

  return (
  <>
  <div className="container">
  
  </div>
  <div className="container">
      <div className="row">
        <div className="col">
        <h2 className="text-center mb-3 fw-bold">商品列表</h2>
            <hr />
          </div>
          <div className="productPage" id="wrapper">
            <div id="page-content-wrapper">
              <div className='d-flex row-cols-md-5'>
                    <Product />
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
  );
}
Home.getLayout = function (page) {
  return <Homepage>{page}</Homepage>;
};
