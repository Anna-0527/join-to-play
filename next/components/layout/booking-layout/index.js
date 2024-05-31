import MyNavbarBS5 from '../default-layout/my-navbar'
import MyFooter from '../default-layout/my-footer'
import Head from 'next/head'
// import { useLoader } from '@/hooks/use-loader'

export default function BookingLayout({ title = '預約頁面', children }) {
  // const { loader } = useLoader()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MyNavbarBS5 />
      <main className="flex-shrink-0">
        {children}
        {/* 全域的載入動畫指示器 */}
        {/* {loader()} */}
      </main>
      <MyFooter />
    </>
  )
}
