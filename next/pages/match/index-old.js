import React from 'react'
import Match from '@/components/match/index-oldoldold'
import MatchLayout from '@/components/layout/match-layout'

export default function MatchIndex() {
  return (
    <>
      <Match />
    </>
  )
}

MatchIndex.getLayout = function (page) {
  return <MatchLayout>{page}</MatchLayout>
}
