import { BlogPost } from '../types/blog';
import { discusstionGraphQL } from './GraphQL';

const API_URL = 'https://api.github.com/graphql';
const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
const GITHUB_DISCUSSTION_CATEGORY_ID = process.env.NEXT_PUBLIC_GITHUB_DISCUSSTION_CATEGORY_ID;

export async function getBlogs(): Promise<BlogPost[]> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ query: discusstionGraphQL(GITHUB_DISCUSSTION_CATEGORY_ID) })
    });

    const res = await response.json();
    const discussions = res.data.repository.discussions.nodes

    const posts = discussions.map((discussion: any) => {
        const {
            title,
            number: id,
            bodyHTML: html,
            bodyText,
            createdAt,
            lastEditedAt: lastEdited,
            author,
            url: discussionUrl,
            labels
        } = discussion

        const url = `/blog/${id}`
        const authorUrl = author.url
        const authorName = author.login
        const authorAvatar = author.avatarUrl
        const tags: string[] = labels.nodes.map((tag: { name: string, color: string }) => {
            return { name: tag.name, color: tag.color };
        })

        const post = {
            id,
            url,
            discussionUrl,
            title,
            html,
            bodyText,
            tags,
            createdAt,
            lastEdited,
            author: { url: authorUrl, name: authorName, avatar: authorAvatar }
        }
        return post
    })

    return posts;
};
