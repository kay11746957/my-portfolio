import { useEffect, useState } from "react";
import { wisp } from "../wisp/client";
import { Post } from "@wisp-cms/client";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    wisp
      .getPosts()
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch posts");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
