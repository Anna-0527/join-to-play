import { createContext, useContext, useState } from 'react'

// 1. 建立context
const CartContext = createContext(null)

// 2. 建立一個Context Provider元件
// 提供給全站最上層元件(_app.js)使用，集中這個context要用的狀態在裡面管理
export function CartProvider({ children }) {
  // 購物車的商品項目。會在加入時，擴充一個qty屬性代表數量
  const [items, setItems] = useState([])

  // 純函式: 單純改變狀態陣列的函式 ---- START
  // 處理商品數量(qty)遞增的函式
  const increment = (items, id) => {
    return items.map((v, i) => {
      // 如果商品物件資料中的id屬性符合傳入的id時，則將qty屬性+1
      if (v.id === id) return { ...v, qty: v.qty + 1 }
      // 否則直接回傳原本的物件值
      else return v
    })
  }

  // 處理商品數量(qty)遞減的函式
  const decrement = (items, id) => {
    return items.map((v, i) => {
      // 如果商品物件資料中的id屬性符合傳入的id時，則將qty屬性-1
      if (v.id === id) return { ...v, qty: v.qty - 1 }
      // 否則直接回傳原本的物件值
      else return v
    })
  }

  // 處理商品刪除的函式
  const remove = (items, id) => {
    return items.filter((v, i) => {
      return v.id !== id
    })
  }

  // 加入到購物車
  const add = (items, item) => {
    // 先判斷是否在購物車已經有這個商品
    const foundIndex = items.findIndex((v, i) => {
      return v.id === item.id
    })

    // 如果有存在==> 數量+1
    if (foundIndex > -1) {
      return increment(items, item.id)
    } else {
      // 如果沒有===> 新增到購物車(需要擴充商品數量屬性qty:1)
      const newItem = { ...item, qty: 1 }
      // 1 2
      return [...items, newItem]
    }
  }
  //純函式: 單純改變狀態陣列的函式 ---- END

  // 以下為處理函式-----
  // 加入到購物車的處理函式
  const addItem = (item) => {
    setItems(add(items, item))
  }

  // 遞增數量的處理函式
  const incrementItemById = (id) => {
    setItems(increment(items, id))
  }

  // 遞減數量的處理函式
  const decrementItemById = (id) => {
    setItems(decrement(items, id))
  }

  // 移除項目的處理函式
  const removeItemById = (id) => {
    setItems(remove(items, id))
  }

  // 計算總數量
  const calcTotalItems = () => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].qty
    }
    return total
  }

  // 計算總金額
  const calcTotalPrice = () => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].qty * items[i].price
    }
    return total
  }

  // 上面也可以用下面的語法來寫
  // 陣列迭代方法 reduce(累加、歸納)，2個值計算出1個值，最終得到1個值
  // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  const totalItems = items.reduce((acc, v) => acc + v.qty, 0)
  const totalPrice = items.reduce((acc, v) => acc + v.qty * v.price, 0)

  return (
    <CartContext.Provider
      // 使用value屬性提供資料給提供者階層以下的所有後代元件
      value={{
        items,
        incrementItemById,
        decrementItemById,
        removeItemById,
        addItem,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// 3. 提供一個包裝好的useContext名稱
// 提供給消費者(consumers)方便使用，直接呼叫就能使用
export const useCart = () => useContext(CartContext)
