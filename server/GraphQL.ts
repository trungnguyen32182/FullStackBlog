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
