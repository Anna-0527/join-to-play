import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PRODUCT_S } from '@/components/config';
import { useRouter } from "next/router";
import { useCart } from '@/hooks/use-cart';
import toast, { Toaster } from 'react-hot-toast'



export default function Products() {
  const router = useRouter();
  
const { addItem } = useCart();

  const notify = (productName) => {
    const msgBox = (
      <div>
        <p>({productName} 加入購物車)</p>
        <button className='cartButton'
          onClick={() => {
            // 另一種導向另一頁面路由的方式
            router.push('/cart')
          }}
        >
          連至 購物車
        </button>
        </div>
    )

     // 呈現土司訊息
    toast.success(msgBox)
  }
  

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: []
  });

  useEffect(() => {
    fetch(PRODUCT_S)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj);
      });
  }, []);



  return (
    <>
        {data.rows.map((product) => (
          <div className="productList" key={product.id}>
                <div className="productCard">
                  <Image
                    className="card-img-top productImage"
                    src={product.image}
                    width={300}
                    height={200}
                    priority
                    alt="product-img"
                  />

                  <div className="card-body">
                    <div className="text-center">
                      <h3 style={{ color: 'red' }}>新品上市</h3>
                      <h5 className="fw-bolder productName">{product.name}</h5>
                      <p>${product.price}</p>
                    </div>
                  </div>

                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <button
                        className="btn btn-outline-primary mt-auto"
                        onClick={() => {
                          addItem(product)
                          // 出現提示訊息
                          notify(product.name)
                        }}
                        
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        ))}
      {/* 擺放訊息用的元件 */}
      {/* <Toaster /> */}
    </>
  );
}