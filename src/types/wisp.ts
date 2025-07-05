export interface PostListItem {
  id: string;
  slug: string;
  title: string;
  publishedAt: Date | null;
}

export interface PostDetail extends PostListItem {
  content: string; // Changed from body to content
}

export interface PostsResponse {
  posts: PostListItem[];
}

export interface GetPostResult {
  post: PostDetail | null; // Post can be null
}