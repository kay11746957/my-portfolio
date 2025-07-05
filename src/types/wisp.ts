export interface PostListItem {
  id: string;
  slug: string;
  title: string;
  publishedAt: Date | null;
}

export interface PostDetail extends PostListItem {
  body: string; // Body is present when fetching a single post
}

export interface PostsResponse {
  posts: PostListItem[];
}