'use client'

import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditPost() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const fetchPost = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id as string)
      .single()
    setTitle(post.title)
    setContent(post.content)
  }

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id as string)
      .select()

    if (error) {
      alert(error.message)
    } else {
      alert('수정 성공')
      router.push('/posts')
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <form className="flex flex-col" onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="p-2 rounded border-1 hover:bg-gray-200">
        수정
      </button>
    </form>
  )
}
