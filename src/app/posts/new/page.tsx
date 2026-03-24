'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(title, content)

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content }])
      .select()

    if (error) {
      alert(error.message)
    } else {
      alert('등록 성공')
      router.push('/posts')
    }
  }

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
        등록
      </button>
    </form>
  )
}
