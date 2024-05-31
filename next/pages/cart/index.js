import Order from '@/components/product/order';


import Link from 'next/link'


import { useCart } from '@/hooks/use-cart'
  
  
  export default function CartIndex() {
  const { totalItems, totalPrice } = useCart()

  
  return (
    <>
<Order/>
<div className="row py-5 p-4 m-4 bg-white rounded shadow-sm">
        <div className="col-lg-6">
          <div className="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">
            訂單資訊{' '}
          </div>
          <div className="p-4">
            <ul className="list-unstyled mb-4">
              <li className="d-flex justify-content-between py-3 border-bottom">
                <p className="text-muted">數量:{totalItems}</p>
              </li>

              <li className="d-flex justify-content-between py-3 border-bottom">
                <p className="text-muted">總金額:NT${totalPrice}</p>
              </li>
            </ul>
            <Link
              className="btn btn-dark rounded-pill py-2 d-md-block"
              href={'/checkout'}
            >
              結帳
            </Link>
          </div>
        </div>
      </div>

    </>
  )
}
