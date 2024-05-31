import { useState } from 'react'

// 範例資料，會自動轉換為js的資料類型
import data from '@/data/books.json'

// 導入css modules轉化為styles物件
import styles from '@/styles/datz-product-table.module.css'

// 導入項目子元件
import BookItem from './book-item'

export default function BookListIndex() {
  // 擴充原本的書籍列表資料，多一個fav屬性(布林值，預設為false)，代表有/沒有加入收藏
  const initState = data.map((v) => {
    return { ...v, fav: false }
  })

  // 書籍狀態
  const [books, setBooks] = useState(initState)

  // 純函式: 傳入一個物件陣列和一個isbn，回傳一個切換對應fav屬性布林值的新陣列
  const toggleFav = (myBooks, myIsbn) => {
    return myBooks.map((v, i) => {
      // 如果書籍物件資料中的isbn屬性符合傳入的myIsbn時，則切換(or反相)fav的布林值
      if (v.isbn === myIsbn) return { ...v, fav: !v.fav }
      // 否則直接回傳原本的物件值
      else return v
    })
  }

  // 事件處理函式用: 組合要傳到BookItem的事件處理函式用(原本要傳三個屬性值，改為傳一個屬性值)
  const handleToggleFav = (isbn) => {
    setBooks(toggleFav(books, isbn))
  }

  return (
    <>
      <h1>書籍清單</h1>
      <table className={styles['my-table']}>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>書名</th>
            <th>作者</th>
            <th>加入收藏</th>
          </tr>
        </thead>
        <tbody>
          {books.map((v, i) => {
            // 先從v中把要用傳給子元件的值解構出來，要一個個傳，不要傳整個v(物件)值，這和元件最佳化有關
            const { isbn, title, author, fav } = v

            return (
              <BookItem
                key={isbn} // key值是要加在map裡，不是拆分的子元件中
                isbn={isbn}
                title={title}
                author={author}
                fav={fav}
                handleToggleFav={handleToggleFav}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}
