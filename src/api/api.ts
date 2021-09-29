// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Post = {
  author: string
  content: string
}

// export const getStaticProps = async () => {
//   const res = await fetch('https://.../posts')
//   const posts: Post[] = await res.json()

//   return {
//     props: {
//       posts,
//     },
//   }
// }