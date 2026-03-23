'use client'

import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  created_at: string
  title: string
  content: string
}

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  const fetchPost = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id as string)
      .single()
    setPost(post)
  }

  const fetchComment = async () => {
    const { data: comment, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id as string)
    setComments(comment)
  }

  useEffect(() => {
    fetchPost()
    fetchComment()
  }, [])

  return (
    <>
      <div>{post.id}번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </>
  )
}
