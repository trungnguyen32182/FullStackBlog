import React from 'react'
import {BlogPost} from '../types/blog'
import BlogHeader from './BlogHeader'

const BlogPreview: React.FC<BlogPost> = (props) => {
  const {title, bodyText, createdAt, author, tags} = props
  const PreviewText: string = bodyText?.substring(0, 150) + '...'
  return (
    <div>
      <BlogHeader createdAt={createdAt} author={author} />
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2">{PreviewText}</p>
      <div className="flex gap-3 flex-wrap">
        {tags.map((tag, idx: number) => (
          <p
            key={idx}
            className={`px-3 py-1 mt-2 font-semibold rounded-full text-zinc-800`}
            style={{backgroundColor: '#' + tag.color}}
          >
            {tag.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default BlogPreview
