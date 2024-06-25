export const discusstionGraphQL = (
  githubDiscusstionCategoryId: string | undefined,
) => {
  const stringRequest = `{
    repository(owner: "trungnguyen32182", name: "JunBlog-Web") {
    discussions(first: 100, categoryId: "${githubDiscusstionCategoryId}") {
     nodes {
    title
      url
      number
      bodyHTML
      bodyText
      createdAt
      lastEditedAt
      author {
        login
        url
        avatarUrl
      }
      labels(first: 100) {
        nodes {
          name
          color
        }
      }
    }
    }
  }
    }`
  return stringRequest
}

export const discusstionDetailGraphQL = (postId: number | undefined) => {
  console.log(postId)
  const stringRequest = `{
  repository(owner: "trungnguyen32182", name: "JunBlog-Web") {
    discussion(number: ${postId}) {
      title
      bodyHTML
      createdAt
      lastEditedAt
      author {
        login
        url
        avatarUrl
      }
    }
  }
}`
  return stringRequest
}
