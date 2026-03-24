'use client'

import Link from 'next/link'

import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('event', event)
      setUser(session?.user ?? null)
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const handleOnLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert(error.message)
    } else {
      alert('로그아웃 성공')
      router.push('/signIn')
    }
  }

  return (
    <nav className="flex">
      <Link href="/" className="p-2 hover:bg-red-200">
        메인
      </Link>
      <Link href="/posts" className="p-2 hover:bg-red-200">
        게시물 목록
      </Link>
      {user ? (
        <>
          <div className="p-2 rounded">{user.email}님 반갑습니다!</div>
          <button
            onClick={handleOnLogout}
            className="p-2 rounded hover:bg-gray-200"
          >
            로그아웃
          </button>
          <Link href="/posts/new" className="p-2 rounded hover:bg-gray-200">
            게시글 등록
          </Link>
        </>
      ) : (
        <>
          <Link href="/signup" className="p-2 rounded hover:bg-gray-200">
            회원가입
          </Link>
          <Link href="/signIn" className="p-2 rounded hover:bg-gray-200">
            로그인
          </Link>
          <Link href="/posts/new" className="p-2 rounded hover:bg-gray-200">
            게시글 등록
          </Link>
        </>
      )}
    </nav>
  )
}
