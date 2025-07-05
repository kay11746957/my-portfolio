export interface Post {
  slug: string;
  title: string;
  body: string; // Assuming body is HTML string based on docs
}

export interface PostsResponse {
  posts: Post[];
}
