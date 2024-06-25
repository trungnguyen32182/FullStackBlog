'use client'
import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import {useParams} from 'next/navigation'
import {BlogDetail} from '../../../../types/blog'
import {getBlogDetail} from '../../../../server/blogs'
import BlogHeader from '../../../../components/BlogHeader'
import parse from 'html-react-parser'
import detail from './id.module.css'
const BlogPost: NextPage = () => {
  const params = useParams<{id: string}>()
  const [blogDetail, setBlogDetail] = useState<BlogDetail>()

  useEffect(() => {
    const fetchBlogs = async () => {
      if (params?.id) {
        try {
          const updateData: BlogDetail = await getBlogDetail(+params.id)

          console.log('fetchBlogs ~ updateData:', updateData)

          setBlogDetail(updateData)
        } catch (error) {
          console.error('Failed to fetch blogs', error)
        }
      }
    }

    if (blogDetail === undefined) {
      fetchBlogs()
    }
  }, [blogDetail, params])

  return (
    <section className="layout">
      {blogDetail && (
        <div className="max-w-[50%]">
          <h1 className="text-center my-10 text-[2rem] font-bold">
            {blogDetail.title}
          </h1>
          <div className="flex justify-center mb-4">
            <BlogHeader
              createdAt={blogDetail.createdAt}
              author={blogDetail.author}
            />
          </div>
          <div className={`${detail.html} flex flex-col`}>
            {blogDetail.bodyHTML && parse(blogDetail.bodyHTML)}
          </div>
        </div>
      )}
    </section>
  )
}

export default BlogPost
