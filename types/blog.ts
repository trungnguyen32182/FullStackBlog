export interface BlogPost {
    id?: number,
    url?: string,
    discussion?: string,
    title?: string,
    html?: string,
    bodyText?: string,
    tags: { name: string, color: string }[],
    createdAt: string,
    lastEdited?: string | null,
    author: {
        name: string,
        avatar: string,
        url: string
    }
}