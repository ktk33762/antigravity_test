'use client'

import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  created_at: string
  title: string
  content: string
}

export default function PostDetail() {
  const { id } = useParams()
  const router = useRouter()
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

  const handleOnDelete = async (id: number) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      alert(error.message)
    } else {
      alert('삭제 성공')
      router.push('/posts')
    }
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
      <button
        className="p-2 rounded border-1 hover:bg-gray-200"
        onClick={() => handleOnDelete(post.id)}
      >
        삭제
      </button>
      <Link
        href={`/posts/${post.id}/edit`}
        className="p-2 rounded border-1 hover:bg-gray-200"
      >
        수정
      </Link>
    </>
  )
}
