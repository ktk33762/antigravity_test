'use client'

import Link from 'next/link'

import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    console.log(user)
    setUser(user)
  }

  useEffect(() => {
    fetchUser()

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
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
        <button
          onClick={handleOnLogout}
          className="p-2 rounded hover:bg-gray-200"
        >
          로그아웃
        </button>
      ) : (
        <>
          <Link href="/signup" className="p-2 rounded hover:bg-gray-200">
            회원가입
          </Link>
          <Link href="/signin" className="p-2 rounded hover:bg-gray-200">
            로그인
          </Link>
        </>
      )}
    </nav>
  )
}
