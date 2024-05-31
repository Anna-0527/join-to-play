import Image from 'next/image'
import Link from 'next/link'

// 以下基礎建設

// 以下組合區塊
import ChooseMatch from './choose-match'
import AlmostMatch from './almost-match'
import UpperBlock from './upper-block'
import DeskBoard from './oldversion/desk-board-old'
import EscapeRoom from './escape-room'

import React from 'react'

export default function Match() {
  return (
    <>
      <UpperBlock />
      <ChooseMatch />
      <AlmostMatch />
      <div className="container-fluid">
        <h2 className="pt-4 ps-4" id="desk-board">
          桌遊媒合
        </h2>
      </div>
      <DeskBoard />

      <div className="container-fluid">
        <h2 className="pt-4 ps-4" id="escape-room">
          密室逃脫媒合
        </h2>
      </div>
      <EscapeRoom />
    </>
  )
}
