import React, { useEffect, useState } from 'react'
import MatchDetail from '@/components/match/desk/md-detail'



import { MATCH_LIST } from '@/configs';
import { useRouter } from 'next/router';

export default function DeskDetail() {

 const  router = useRouter();
 
/*
  
   useEffect(()=>{
    if(! md_id) return ; // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${MD_ITEM}/${md_id}`)
    .then(r=>r.json())
    .then(result=>{
      console.log(result);
      if(result.success){
        setData({...result.data});
      } else {
        router.push("/match/desk");
      }
    });
  }, [ md_id, router ]);
   console.log(data);
  
*/
  return (
<>
<div className="container">
  <div className="row">
    <div className="col-sm-12 col-md-8 my-5">

  <MatchDetail md_id={router.query.md_id} />
    </div>
  </div>
</div>
</>
  )
}
