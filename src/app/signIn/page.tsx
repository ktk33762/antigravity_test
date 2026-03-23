'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      alert(error.message)
    } else {
      alert('로그인 성공')
    }
    console.log(email, password)
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-3 w-80">
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="border border-gray-400 p-2">로그인</button>
    </form>
  )
}
