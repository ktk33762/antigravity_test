'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {}, [])
  return (
    <ul>
      <li>내용1</li>
      <li>내용2</li>
      <li>내용3</li>
    </ul>
  )
}
