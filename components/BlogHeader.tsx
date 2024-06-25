import React from 'react'

interface headerProps {
  createdAt: string
  author: {
    name: string
    avatar: string
    url: string
  }
}

const BlogHeader: React.FC<headerProps> = (props) => {
  const {createdAt, author} = props
  const createDate = new Date(createdAt)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return (
    <div className="flex flex-wrap">
      <img
        className="rounded-full mb-4 mr-4"
        src={author.avatar}
        alt="avatar profile"
        width={50}
        height={50}
      />
      <div className="flex flex-col flex-wrap">
        <p className="font-semibold text-[1rem]">{author.name}</p>
        <div className="flex gap-4">
          <li className="list-none font-normal text-[.85rem]">{author.url}</li>
          <li className="font-normal text-[.85rem] ml-2">
            {createDate.toLocaleDateString('en-US', options)}
          </li>
        </div>
      </div>
    </div>
  )
}

export default BlogHeader
