// 導入子元件
import FavIcon from './fav-icon'

// 給定屬性值的預設值可以讓元件執行時更穩健
export default function BookItem({
  isbn = '',
  title = '',
  author = '',
  fav = false,
  handleToggleFav = () => {},
}) {
  return (
    <>
      <tr>
        <td>{isbn}</td>
        <td>{title}</td>
        <td>{author}</td>
        <td>
          <FavIcon fav={fav} isbn={isbn} handleToggleFav={handleToggleFav} />
        </td>
      </tr>
    </>
  )
}
