import * as React from 'react'

import { initializeDB } from '../infra/db'
import { runtimeCheck } from '../utils/runtimeChecker'


export const Home = ({ getServerSidePropsResult }) => {
  const [useEffectResult, setUseEffectResult] = React.useState({})

  React.useEffect(() => {
    const f = async () => {
      const db = initializeDB()
      const result = await db.collection('posts').get()
      let data = []
      result.forEach(doc => {
        data.push(doc.data());
      })

      const posts  = data
      const runtime = runtimeCheck()

      setUseEffectResult({ posts, runtime })
    }

    f()
  }, [])

  return (
    <>
      <h1>fetch in getServerSideProps Result</h1>
      <h3>runtimeCheck: {getServerSidePropsResult.runtime}</h3>
      <h3>title: {getServerSidePropsResult.posts[0].title}</h3>
      <h3>body: {getServerSidePropsResult.posts[0].body}</h3>

      <h1>fetch in useEffect Result</h1>
      <h3>runtimeCheck: {useEffectResult.runtime}</h3>
      <h3>title: {useEffectResult.posts ? useEffectResult.posts[0].title : null}</h3>
      <h3>body: {useEffectResult.posts ? useEffectResult.posts[0].body : null}</h3>
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

  return { props: { getServerSidePropsResult: { posts: data, runtime: runtimeCheck() }} }
}

export default Home