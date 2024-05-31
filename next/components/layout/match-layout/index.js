import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { useLoader } from '@/hooks/use-loader'

// 以下基礎建設

import MyNavbar from './my-navbar'
import MyFooter from './my-footer'
import UpperBlock from '@/components/match/upper-block'
import ChooseMatch from '@/components/match/choose-match'
import BackToTopButton from '@/components/match/BackToTopButton'
import AlmostMatch from '@/components/match/almost-match'


// import NextBreadCrumb from '@/components/common/next-breadcrumb'


export default function MatchLayout({ title = '', children }) {
  const { loader } = useLoader()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MyNavbar />

      <BackToTopButton />
      <UpperBlock/>
      <ChooseMatch/>

    {/*  <NextBreadCrumb isHomeIcon isChevron bgClass="" /> */}
      <main className="flex-shrink-0 mt-3">
{loader()}
      {children}
{/* 全域的載入動畫指示器 */}
      </main>
      <MyFooter />
    </>
  )
}

