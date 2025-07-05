import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { wisp } from "../wisp/client";
import { ContentWithCustomComponents } from "@wisp-cms/react-custom-component";
import type { PostDetail, GetPostResult } from "../types/wisp";

export default function BlogPost() {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (!slug) return;
    console.log("Fetching post with slug:", slug);
    wisp
      .getPost(slug)
      .then((data: GetPostResult) => {
        console.log("Received post data:", data);
        setPost(data.post);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("Failed to fetch post");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <ContentWithCustomComponents content={post.content} customComponents={{}} />
    </div>
  );
}
