import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { wisp } from "../wisp/client";
import { WispComponent } from "@wisp-cms/react-custom-component";
import { Post } from "../types/wisp";

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (!slug) return;
    wisp
      .getPostBySlug(slug)
      .then((data: Post) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
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
    <WispComponent components={{}} content={post.body} />
  );
}
