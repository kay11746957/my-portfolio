import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { wisp } from "../wisp/client";
import { WispComponent } from "@wisp-cms/react-custom-component";

export default function BlogPost() {
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (!slug) return;
    wisp
      .getPostBySlug(slug)
      .then((data: any) => {
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
