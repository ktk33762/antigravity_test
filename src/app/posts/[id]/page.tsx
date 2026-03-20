'use client'

import { supabase } from '@/supabase/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState({})

  const fetchData = async () => {
    const { data: posts, error } = await supabase.from('posts').select('*')
    setPost(posts ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <div>{id}번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </>
  )
}
