import { useRouter } from 'next/router'
import  {PRODUCT_S} from '@/components/config'
import Product from '@/components/product/product'
// import styles from '@/styles/product.module.scss'

import { useEffect, useState } from 'react'

export default function List() {
  // Toggle the side navigation
  const router = useRouter()

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: []
  });

  useEffect(() => {
    // fix next issue
    if (typeof window !== 'undefined') {
      const sidebarToggle = document.body.querySelector('#sidebarToggle')

      if (sidebarToggle) {
        // 在localStorage中儲存目前sidebar情況
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
          document.body.classList.toggle('sb-sidenav-toggled')
        }

        sidebarToggle.addEventListener('click', (event) => {
          event.preventDefault()

          document.body.classList.toggle('sb-sidenav-toggled')

          localStorage.setItem(
            'sb|sidebar-toggle',
            document.body.classList.contains('sb-sidenav-toggled')
          )
        })
      }
    }
  }, [])

  useEffect(() => {
    fetch(`${PRODUCT_S}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => {
      setData(dataObj);
      });
  }, []);

  return (
    <>
    <div className="products-container">
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
  )
}
