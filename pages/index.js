import * as React from 'react'

import { initializeDB } from '../infra/db'
import { runtimeCheck } from '../utils/runtimeChecker'

export const Home = ({ posts, runtime }) => {
  return (
    <>
      <h1>title: {posts[0].title}</h1>
      <h1>body: {posts[0].body}</h1>
      <h1>runtimeCheck: {runtime}</h1>
    </>
  )
}

export const getServerSideProps = async () => {
  const db = initializeDB()
  const result = await db.collection('posts').get()
  let data = []
  result.forEach(doc => {
    data.push(doc.data());
  })

  return { props: { posts: data, runtime: runtimeCheck() } }
}

export default Home