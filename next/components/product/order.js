import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function CartList() {
  const { items, incrementItemById, decrementItemById, removeItemById } =
    useCart()

  const notifyAndRemove = (productName, id) => {
    MySwal.fire({
      title: '你確定嗎？',
      text: '你將無法回復這個操作！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '是的，刪除它！',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '刪除!',
          text: productName + ' 已從購物車中被刪除',
          icon: 'success',
        })
        // 這裡作刪除的動作
        removeItemById(id)
      }
    })
  }

  
  return (
    <>
    <section className="mt-5">
    <div className="container px-4 px-lg-5 my-5">
      <div className="row">
        <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-0 bg-light">
                    <div className="p-2 px-3 text-uppercase">商品</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">價格</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">數量</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">刪除</div>
                  </th>
                </tr>
              </thead>
              <tbody>


            

{items.map((v, i) => {
                  return (
                  <tr key={v.id}>
                  <th scope="row" className="border-0">
                    <div className="p-2">
                      <Image
                        src={v.image}
                        alt="..."
                        width={150}
                        height={150}
                        className="img-fluid rounded shadow-sm"
                      />
                      <div className="ms-3 d-inline-block align-middle">
                        <h5 className="mb-0">
                          {' '}
                          <Link
                            href="/product/list"
                            className="text-dark d-inline-block align-middle"
                          >
                            {v.name}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </th>
                  <td className="border-0 align-middle">
                    <p style={{ fontWeight: 'bold' }}>NT${v.price}</p>
                  </td>
                  <td className="border-0 align-middle">
                  <div>
                <button className='plus-minus-button'
                  onClick={() => {
                    incrementItemById(v.id)
                  }}
                >
                  +
                </button>
                <span>{v.qty}</span>
                <button className='plus-minus-button'
                  onClick={() => {
                    // 如果使用者按下-按鈕，預先計算商品的數量會變多少
                    const nextQty = v.qty - 1
                    // 下一個(即將改變)的商品數量會變為0的話，移除此商品
                    if (nextQty === 0) {
                      //removeItemById(v.id)
                      // 改為下面這個對話盒，使用者確定後才刪除
                      notifyAndRemove(v.name, v.id)
                    } else {
                      decrementItemById(v.id)
                    }
                  }}
                >
                  -
                </button>
              </div>
                  </td>
                  <td className="border-0 align-middle">
                    <button className="text-dark border-0" onClick={() => {
                    //removeItemById(v.id)
                    // 改為下面這個對話盒，使用者確定後才刪除
                    notifyAndRemove(v.name, v.id)
                  }}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>)})}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

